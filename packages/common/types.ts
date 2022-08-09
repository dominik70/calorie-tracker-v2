import { z } from 'zod';
import { loginSchema, registerSchema } from './schemas';

export type Login = z.infer<typeof loginSchema>;
export type Register = z.infer<typeof registerSchema>;
