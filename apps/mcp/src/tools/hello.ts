import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export function registerHelloTool(server: McpServer) {
  // 本来はツールをreturnして呼び出し元でregisterしたいが、
  // 型安全に扱いづらいのと初期化フェーズしか呼ばれない処理のため
  // 一旦副作用を許容する
  server.registerTool(
    'hello',
    {
      title: '特別な挨拶',
      description: '特別な挨拶を返します。',
    },
    () => ({
      content: [{ type: 'text', text: 'HHHDDDOOOWNN！特別な挨拶です。' }],
    })
  );
}
