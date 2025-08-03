import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { container } from 'tsyringe';
import { CompletionSchema } from '../schemas/chat/completions.schema';
import { CompletionsUsecase } from '../../application/usecases/chat/completions.usecase';
import { Prompt } from '../../domain/chat/prompt/prompt';
import { PromptText } from '../../domain/chat/prompt/prompt-text';

const aiRoute = new Hono();

aiRoute.get('/', (c) => {
  return c.text('chat Route executed successfully!!!');
});

aiRoute.post(
  '/completions',
  zValidator('json', CompletionSchema),
  async (c) => {
    const completionsBody = c.req.valid('json');
    const usecase = container.resolve(CompletionsUsecase);

    const prompt = new Prompt(new PromptText(completionsBody.prompt));

    const response = await usecase.execute(prompt);
    return c.json({ result: response });
  }
);

export default aiRoute;
