import type { PromptText } from './prompt-text';

export class Prompt {
  private constructor(private readonly promptText: PromptText) {}

  public toPrimitives(): {
    text: string;
  } {
    return {
      text: this.promptText.value,
    };
  }
}
