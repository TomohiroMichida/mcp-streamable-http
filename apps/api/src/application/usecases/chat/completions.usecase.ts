import type { Prompt } from '../../../domain/chat/prompt/prompt';
import { AiResponse } from '../../../domain/chat/response/ai-response';
import { injectable, inject } from 'tsyringe';
import type { GenerativeAiClient } from '../../../infrastructure/services/generative-ai/generative-ai-client.interface';
import { GENERATIVE_AI_CLIENT_TOKEN } from '../../../infrastructure/di/registrations/generative-ai';

@injectable()
export class CompletionsUsecase {
  constructor(
    @inject(GENERATIVE_AI_CLIENT_TOKEN)
    private readonly generativeAiClient: GenerativeAiClient
  ) {}

  async execute(prompt: Prompt): Promise<AiResponse> {
    // ここでgenerative aiを使用する
    const response = await this.generativeAiClient.generateResponse(prompt);
    return new AiResponse(response);
  }
}
