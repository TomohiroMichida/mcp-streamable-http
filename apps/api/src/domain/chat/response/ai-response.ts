import type { Content } from './content';

export class AiResponse {
  private readonly content: Content;

  constructor(text: Content) {
    this.content = text;
  }

  public toPrimitives(): {
    text: string;
  } {
    return {
      text: this.content.value,
    };
  }
}
