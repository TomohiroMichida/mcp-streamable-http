import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { configureContainer } from './di/container';

configureContainer();

const app = new Hono();
app.use(
  '*',
  cors({
    origin: process.env.CORS_ORIGIN || '*',
  })
);

app.get('/', (c) => {
  return c.text('API executed successfully!');
});

const port = Number(process.env.API_PORT || 4001);
console.info('===================================================');
console.info(`Server is running on port ${port}`);
console.info('===================================================');

serve({
  fetch: app.fetch,
  port: port,
});
