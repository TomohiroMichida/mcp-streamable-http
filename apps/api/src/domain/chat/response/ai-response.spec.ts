import { Content } from './content';

describe('Content', () => {
  it('正常にインスタンス化できる', () => {
    const contentText = 'テストコンテンツ';
    const content = new Content(contentText);
    expect(content.value).toBe(contentText);
  });
});
