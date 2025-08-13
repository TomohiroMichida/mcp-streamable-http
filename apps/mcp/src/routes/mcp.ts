import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { Request, Response } from 'express';
import { Router } from 'express';
import { registerAddTool } from '../tools/add';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { registerHelloTool } from '../tools/hello';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const server = new McpServer({
    name: 'mcp-server',
    version: '1.0.0',
  });
  registerAddTool(server);
  registerHelloTool(server);

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  res.on('close', () => {
    transport.close();
    server.close();
  });

  try {
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error('MCP Serverでエラーが発生しました:', error);
  }

  return server;
});

export default router;
