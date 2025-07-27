import express from 'express';
import mcpRouter from './routes/mcp';

async function main() {
  const app = express();
  app.use(express.json());
  app.use('/mcp', mcpRouter);

  const PORT = process.env.PORT || 7001;
  await new Promise((resolve, reject) => {
    app
      .listen(PORT, () => {
        console.log(`==================================================`);
        console.log(`MCP Server is running on http://localhost:${PORT}`);
        console.log(`==================================================`);
      })
      .on('error', reject)
      .on('listening', resolve);
  });
}

main().catch((error) => {
  console.error(`MCPサーバーの起動に失敗しました: ${error.message}`);
  process.exit(1);
});
