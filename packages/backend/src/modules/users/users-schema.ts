import { createFoodBody, registerSchema } from '@calorie-tracker/common';
import { z } from 'zod';

export const createUserSchema = z.object({
  body: registerSchema,
});

export const createFoodSchema = z.object({
  body: createFoodBody,
  params: z.object({ userId: z.string() }),
});

export const getFoodSchema = z.object({
  params: z.object({ userId: z.string() }),
  query: z.object({ from: z.string(), to: z.string() }),
});

export const updateFoodSchema = z.object({
  body: createFoodBody.partial(),
  params: z.object({ id: z.string(), userId: z.string() }),
});

export const deleteFoodSchema = z.object({
  params: z.object({ id: z.string() }),
});

export type GetUserFood = z.infer<typeof getFoodSchema>;
export type CreateUserFood = z.infer<typeof createFoodSchema>;
export type UpdateUserFood = z.infer<typeof updateFoodSchema>;
export type DeleteUserFood = z.infer<typeof deleteFoodSchema>;

export type CreateUser = z.infer<typeof createUserSchema>;
