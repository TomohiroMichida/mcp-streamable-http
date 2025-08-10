import { z } from 'zod';

export const CompletionsRequestSchema = z.object({
  prompt: z.string().min(1),
});

export type CompletionsRequest = z.infer<typeof CompletionsRequestSchema>;
