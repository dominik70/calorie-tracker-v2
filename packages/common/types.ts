import { z } from 'zod';
import { createFoodBody, loginSchema, registerSchema } from './schemas';

export type Login = z.infer<typeof loginSchema>;
export type Register = z.infer<typeof registerSchema>;
export type CreateFoodBody = z.infer<typeof createFoodBody>;
