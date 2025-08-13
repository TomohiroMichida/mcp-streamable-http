import { container } from 'tsyringe';
import { CustomOpenAiClient } from '../../services/generative-ai/custom-openai-client';
import type { GenerativeAiClient } from '../../services/generative-ai/generative-ai-client.interface';

export function registerGenerativeAI() {
  container.register<GenerativeAiClient>(GENERATIVE_AI_CLIENT_TOKEN, {
    useValue: new CustomOpenAiClient({
      apiKey: process.env.OPENAI_API_KEY || '',
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
    }),
  });
}

export const GENERATIVE_AI_CLIENT_TOKEN = 'GenerativeAiClient';
