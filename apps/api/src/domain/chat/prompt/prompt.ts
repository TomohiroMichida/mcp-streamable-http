import type { PromptText } from './prompt-text';

export class Prompt {
  constructor(private readonly promptText: PromptText) {}

  public toPrimitives(): {
    text: string;
  } {
    return {
      text: this.promptText.value,
    };
  }
}
