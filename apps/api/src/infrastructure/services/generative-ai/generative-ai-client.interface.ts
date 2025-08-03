import type { Prompt } from '../../../domain/chat/prompt';

export interface GenerativeAiClient {
  /** 返答生成 */
  generateResponse(prompt: Prompt): Promise<string>;
}
