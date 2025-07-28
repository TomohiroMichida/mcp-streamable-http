import type { GenerativeAiClient } from './GenarativeAiClient.interface';
import { ChatOpenAI } from '@langchain/openai';

export class CustomOpenAiClient implements GenerativeAiClient {
  private readonly openAiClient: ChatOpenAI;
  constructor(config: { apiKey: string; model: string }) {
    this.openAiClient = new ChatOpenAI({
      apiKey: config.apiKey,
      model: config.model,
    });
  }

  async generateResponse(prompt: string): Promise<string> {
    const result = await this.openAiClient.invoke(prompt);
    if (typeof result.content !== 'string') {
      throw new Error('No text content found in response');
    }
    return result.content;
  }
}
