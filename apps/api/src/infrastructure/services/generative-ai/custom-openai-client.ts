import type { GenerativeAiClient } from './generative-ai-client.interface';
import { ChatOpenAI } from '@langchain/openai';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import type { Prompt } from '../../../domain/chat/prompt/prompt';
import { Content } from '../../../domain/chat/response/content.js';
import {
  SystemMessage,
  HumanMessage,
  AIMessage,
  ToolMessage,
} from '@langchain/core/messages';

export class CustomOpenAiClient implements GenerativeAiClient {
  private readonly openAiClient: ChatOpenAI;
  private readonly mcpClient: Client;
  private readonly transport: StreamableHTTPClientTransport;

  constructor(config: { apiKey: string; model: string; mcpEndpoint: string }) {
    this.openAiClient = new ChatOpenAI({
      apiKey: config.apiKey,
      model: config.model,
    });
    this.transport = new StreamableHTTPClientTransport(
      new URL(config.mcpEndpoint)
    );

    this.mcpClient = new Client({
      name: 'custom-mcp-client',
      version: '1.0.0',
    });
  }

  async generateResponse(prompt: Prompt): Promise<Content> {
    const promptText = prompt.toPrimitives().text;
    const availableTools = await this.getAvailableTools();
    const messages = [
      new SystemMessage(
        `利用可能なツール： ${availableTools.map((tool) => tool.name).join(', ')}`
      ),
      new HumanMessage(promptText),
    ];
    const result = await this.openAiClient.invoke(messages);

    if (typeof result.content !== 'string') {
      throw new Error('No text content found in response');
    }

    if (!result.tool_calls || result.tool_calls.length === 0) {
      return new Content(result.content);
    }

    // TODO ツール実行パターン リファクタ
    const retryMessages = [...messages];
    for (const toolCall of result.tool_calls) {
      try {
        const toolResult = await this.mcpClient.callTool({
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
            tool_call_id: toolCall.id!,
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
  }

  async getAvailableTools() {
    const tools = await this.mcpClient.listTools();
    return tools.tools;
  }
}
