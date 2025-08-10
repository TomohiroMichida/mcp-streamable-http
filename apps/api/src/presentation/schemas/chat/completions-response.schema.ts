import { z } from 'zod';

export const CompletionsResponseSchema = z.object({
  content: z.string(),
});

export type CompletionsResponse = z.infer<typeof CompletionsResponseSchema>;
