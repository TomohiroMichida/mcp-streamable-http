import { Hono } from 'hono';

const aiRoute = new Hono();

aiRoute.get('/', (c) => {
  return c.text('AI Route executed successfully!!!');
});

aiRoute.post('/generate', async (c) => {
  const body = await c.req.json();
  const { prompt } = body;
});
