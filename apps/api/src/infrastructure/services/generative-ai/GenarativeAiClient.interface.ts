export interface GenerativeAiClient {
  /** 返答生成 */
  generateResponse(prompt: string): Promise<string>;
}
