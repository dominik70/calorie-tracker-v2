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
