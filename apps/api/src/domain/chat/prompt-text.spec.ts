import { PromptText } from './prompt-text';

describe('PromptText', () => {
  it('正常なテキストでインスタンス化できる', () => {
    const text = 'テストプロンプト';
    const promptText = new PromptText(text);
    expect(promptText.value).toBe(text);
  });

  it('空文字列の場合はエラーになる', () => {
    expect(() => new PromptText('')).toThrow('入力が不正です。');
  });
});
