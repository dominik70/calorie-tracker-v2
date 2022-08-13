import { z } from 'zod';

export const getFoodSchema = z.object({
  params: z.object({
    id: z
      .preprocess((v) => Number(v), z.number().int())
      .transform((v) => v.toString()),
  }),
});

export const getFoodsSchema = z.object({
  query: z.object({
    page: z.preprocess((v) => Number(v), z.number().int()).optional(),
    query: z.string().optional(),
    category: z.string().optional(),
  }),
});

export type GetFood = z.infer<typeof getFoodSchema>;
export type GetFoods = z.infer<typeof getFoodsSchema>;
