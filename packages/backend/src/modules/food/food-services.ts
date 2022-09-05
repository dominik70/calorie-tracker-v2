import { prisma } from '../../db/prisma';
import { FOOD_SELECT } from '../../utils/constants';

export const findFood = (id: number) => {
  return prisma.food.findUnique({
    where: { id },
    select: FOOD_SELECT,
  });
};

export const findFoods = async (
  query = '',
  page = 1,
  categoryId?: string,
  pageSize = 10
) => {
  const where = {
    name: {
      contains: query,
      mode: 'insensitive',
    },
    ...(Number(categoryId) && { category: { id: Number(categoryId) } }),
  } as const;

  const { _count: count } = await prisma.food.aggregate({
    _count: true,
    where,
  });

  const food = await prisma.food.findMany({
    take: Number(pageSize),
    skip: (page - 1) * pageSize,
    where,
    select: FOOD_SELECT,
  });

  return { count, totalPages: Math.ceil(count / pageSize), food };
};

export const findCategories = () => {
  return prisma.category.findMany({ orderBy: { name: 'asc' } });
};
