import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { container } from 'tsyringe';
import { CompletionsRequestSchema } from '../schemas/chat/completions-request.schema';
import { CompletionsUsecase } from '../../application/usecases/chat/completions.usecase';
import { Prompt } from '../../domain/chat/prompt/prompt';
import { PromptText } from '../../domain/chat/prompt/prompt-text';
import type { CompletionsResponse } from '../schemas/chat/completions-response.schema';

const aiRoute = new Hono();

aiRoute.get('/', (c) => {
  return c.text('chat Route executed successfully!!!');
});

aiRoute.post(
  '/completions',
  zValidator('json', CompletionsRequestSchema),
  async (c) => {
    const completionsBody = c.req.valid('json');
    const usecase = container.resolve(CompletionsUsecase);

    const prompt = new Prompt(new PromptText(completionsBody.prompt));

    const response: CompletionsResponse = {
      content: (await usecase.execute(prompt)).toPrimitives().text,
    };
    return c.json(response);
  }
);

export default aiRoute;
