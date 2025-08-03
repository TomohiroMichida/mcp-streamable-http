import type { Prompt } from '../../../domain/chat/prompt/prompt';
import type { Content } from '../../../domain/chat/response/content.js';

export interface GenerativeAiClient {
  /** 返答生成 */
  generateResponse(prompt: Prompt): Promise<Content>;
}
