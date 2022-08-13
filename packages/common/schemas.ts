import { MEALS } from './constants';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email().trim().min(3).max(50),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=]{6,50}$/,
      'Password must be between 6 and 30 characters, contain at least 1 uppercase character and 1 digit'
    ),
});

export const registerSchema = z
  .object({
    confirmPassword: z.string(),
    email: z.string().email().trim().min(3).max(50),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=]{6,50}$/,
        'Password must be between 6 and 30 characters, contain at least 1 uppercase character and 1 digit'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwords must match',
    path: [''],
  });

export const createFoodBody = z.object({
  quantity: z.preprocess((val) => Number(val), z.number().min(1).max(10000)),
  foodId: z.number(),
  date: z.string(),
  meal: z.enum(MEALS),
});

export const updateFoodBody = z.object({
  quantity: z.preprocess((val) => Number(val), z.number().min(1).max(10000)),
  meal: z.enum(MEALS),
});
