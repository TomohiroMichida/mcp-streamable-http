import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerAddTool } from './tools/add';

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: 'mcp-server',
    version: '1.0.0',
  });

  registerAddTool(server);

  return server;
}
