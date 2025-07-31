import { z } from 'zod';

export const CompletionSchema = z.object({
  prompt: z.string().min(1),
});

export type Completion = z.infer<typeof CompletionSchema>;
