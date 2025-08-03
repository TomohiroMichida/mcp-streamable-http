import 'dotenv/config';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { errorHandler } from './presentation/middleware/errorHandler';
import { configureContainer } from './infrastructure/di/container';
import chatRoute from './presentation/routes/chat.route';

configureContainer();

const app = new Hono();
app.use(
  '*',
  cors({
    origin: process.env.CORS_ORIGIN || '*',
  })
);

app.use('*', errorHandler);

app.route('/chat', chatRoute);

app.get('/', (c) => {
  return c.text('API executed successfully!!!');
});

const port = Number(process.env.API_PORT || 4001);
console.info('===================================================');
console.info(`Server is running on port ${port}`);
console.info('===================================================');

serve({
  fetch: app.fetch,
  port: port,
});
