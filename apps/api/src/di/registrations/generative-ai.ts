import { container } from 'tsyringe';
import { CustomOpenAiClient } from '../../infrastructure/generative-ai/CustomOpenAiClient';
import type { GenerativeAiClient } from '../../infrastructure/generative-ai/GenarativeAiClient.interface';

export function registerGenerativeAI() {
  container.register<GenerativeAiClient>('GenerativeAiClient', {
    useValue: new CustomOpenAiClient({
      apiKey: process.env.OPENAI_API_KEY || '',
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
    }),
  });
}
