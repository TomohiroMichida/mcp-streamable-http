import type { GenerativeAiClient } from './GenarativeAiClient.interface';
import { ChatOpenAI } from '@langchain/openai';

export class CustomOpenAiClient implements GenerativeAiClient {
  private readonly openAiClient: ChatOpenAI;
  constructor(apiKey: string, model: string) {
    this.openAiClient = new ChatOpenAI({
      apiKey: apiKey,
      model: model,
    });
  }
  generateResponse(_prompt: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
