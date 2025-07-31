import { Hono } from 'hono';

const aiRoute = new Hono();

aiRoute.get('/', (c) => {
  return c.text('chat Route executed successfully!!!');
});

aiRoute.post('/completions', async (c) => {
  const body = await c.req.json();
  // TODO
  return body;
});
