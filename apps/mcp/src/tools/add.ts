import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export function registerAddTool(server: McpServer) {
  // 本来はツールをreturnして呼び出し元でregisterしたいが、
  // 型安全に扱いづらいのと初期化フェーズしか呼ばれない処理のため
  // 一旦副作用を許容する
  server.registerTool(
    'add',
    {
      title: '加算処理',
      description: '引数として与えられた2つの数値を加算します。',
      inputSchema: { a: z.number(), b: z.number() },
    },
    async ({ a, b }) => ({ content: [{ type: 'text', text: String(a + b) }] })
  );
}
