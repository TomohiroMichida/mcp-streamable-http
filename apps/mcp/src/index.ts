import express from 'express';

async function main() {
  const app = express();
  app.use(express.json());

  // TODO mcpサーバー初期化

  const PORT = process.env.PORT || 7001;
  app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`MCP Server is running on http://localhost:${PORT}`);
    console.log(`==================================================`);
  });
}

main().catch((error) => {
  console.error(`MCPサーバーの起動に失敗しました: ${error.message}`);
  process.exit(1);
});
