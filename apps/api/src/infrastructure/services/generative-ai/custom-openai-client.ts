import type { GenerativeAiClient } from './generative-ai-client.interface';
import { ChatOpenAI } from '@langchain/openai';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import type { Prompt } from '../../../domain/chat/prompt/prompt';
import { Content } from '../../../domain/chat/response/content.js';
import { HumanMessage, AIMessage, ToolMessage } from '@langchain/core/messages';

export class CustomOpenAiClient implements GenerativeAiClient {
  private readonly openAiClient: ChatOpenAI;

  constructor(config: { apiKey: string; model: string }) {
    this.openAiClient = new ChatOpenAI({
      apiKey: config.apiKey,
      model: config.model,
    });
  }

  async generateResponse(prompt: Prompt): Promise<Content> {
    const transport = new StreamableHTTPClientTransport(
      new URL(process.env.MCP_ENDPOINT || 'http://localhost:7001/mcp')
    );
    const mcpClient = new Client({
      name: 'custom-mcp-client',
      version: '1.0.0',
    });
    await mcpClient.connect(transport);

    try {
      const availableTools = await mcpClient
        .listTools()
        .then((tools) => tools.tools);
      this.openAiClient.bindTools(
        availableTools.map((tool) => ({
          type: 'function',
          function: tool,
        }))
      );

      const promptText = prompt.toPrimitives().text;
      const messages = [new HumanMessage(promptText)];
      const result = await this.openAiClient.invoke(messages);

      if (typeof result.content !== 'string') {
        throw new Error('No text content found in response');
      }

      if (!result.tool_calls || result.tool_calls.length === 0) {
        return new Content(result.content);
      }

      // TODO ツール実行ロジックを分離する
      const retryMessages = [...messages];
      for (const toolCall of result.tool_calls) {
        if (!toolCall.id) throw new Error('Invalid tool call: missing id');
        try {
          console.log(`ツールを実行します: ${toolCall.name}`);
          const toolResult = await mcpClient.callTool({
            name: toolCall.name,
            arguments: toolCall.args,
          });
          retryMessages.push(
            new AIMessage({
              content: result.content || '',
              tool_calls: result.tool_calls,
            })
          );
          retryMessages.push(
            new ToolMessage({
              content: JSON.stringify(toolResult.content),
              tool_call_id: toolCall.id,
            })
          );
        } catch (error) {
          throw new Error(
            `ツール実行中にエラーが発生しました： ${toolCall.name}, ${error}`
          );
        }
      }
      const retryResult = await this.openAiClient.invoke(retryMessages);
      if (typeof retryResult.content !== 'string') {
        throw new Error('No text content found in retry response');
      }
      return new Content(retryResult.content);
    } finally {
      await this.closeMcpConnection(mcpClient, transport);
    }
  }

  private async closeMcpConnection(
    mcpClient: Client,
    transport: StreamableHTTPClientTransport
  ) {
    try {
      await mcpClient.close();
      await transport.close();
    } catch (error) {
      console.error('MCP Clientのクローズ中にエラーが発生しました:', error);
    }
  }
}
