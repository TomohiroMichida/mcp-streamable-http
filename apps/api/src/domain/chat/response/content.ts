export class Content {
  private readonly text: string;
  constructor(text: string) {
    this.text = text;
  }

  get value(): string {
    return this.text;
  }
}
