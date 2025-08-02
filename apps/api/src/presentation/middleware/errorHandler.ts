import { ZodError } from 'zod';
import type { Context, MiddlewareHandler } from 'hono';

export const errorHandler: MiddlewareHandler = async (
  c: Context,
  next: () => Promise<void>
) => {
  try {
    await next();
    return c.res;
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedResponse = error.errors.map((e) => ({
        path: e.path.join('.') || '<root>',
        message: e.message,
      }));
      return c.json({ errors: formattedResponse }, 400);
    }

    console.error(error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
};
