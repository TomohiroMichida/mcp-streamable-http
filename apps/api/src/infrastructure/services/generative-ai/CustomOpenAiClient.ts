import type { GenerativeAiClient } from './GenarativeAiClient.interface';
import { ChatOpenAI } from '@langchain/openai';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';

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

  async generateResponse(prompt: string): Promise<string> {
    const result = await this.openAiClient.invoke(prompt);
    if (typeof result.content !== 'string') {
      throw new Error('No text content found in response');
    }
    return result.content;
  }

  async getAvailableTools() {
    await this.mcpClient.connect(this.transport);
    const tools = await this.mcpClient.listTools();
    return tools.tools;
  }
}
