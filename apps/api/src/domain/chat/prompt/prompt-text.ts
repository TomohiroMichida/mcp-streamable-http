export class PromptText {
  private readonly text: string;

  constructor(text: string) {
    if (text.length === 0) {
      throw new Error('入力が不正です。');
    }
    this.text = text;
  }

  get value(): string {
    return this.text;
  }
}
