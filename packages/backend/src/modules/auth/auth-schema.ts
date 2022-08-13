import { loginSchema } from '@calorie-tracker/common';
import { z } from 'zod';

export const createSessionSchema = z.object({
  body: loginSchema,
});

export type CreateSession = z.infer<typeof createSessionSchema>;
