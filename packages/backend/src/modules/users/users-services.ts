import bcrypt from 'bcrypt';
import { startOfDay, endOfDay } from 'date-fns';
import { prisma } from '../../db/prisma';
import { FOOD_SELECT } from '../../utils/constants';
import { CreateUserFood, UpdateUserFood } from './users-schema';

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({ data: { email, password: hashedPassword } });
};

export const findUser = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const findUserFood = (userId: string, from: Date, to: Date) => {
  return prisma.userFood.findMany({
    where: {
      userId,
      date: { gte: from, lte: to },
    },
    select: {
      id: true,
      quantity: true,
      meal: true,
      food: { select: FOOD_SELECT },
    },
    orderBy: { createdAt: 'asc' },
  });
};

export const createUserFood = (
  userId: string,
  data: CreateUserFood['body']
) => {
  const { date, meal, foodId } = data;
  return prisma.$transaction([
    prisma.userFood.deleteMany({
      where: {
        food: {
          id: foodId,
        },
        date: {
          gte: startOfDay(new Date(date)),
          lte: endOfDay(new Date(date)),
        },
        meal,
      },
    }),
    prisma.userFood.create({
      data: { ...data, date: new Date(date), userId },
      select: {
        id: true,
        quantity: true,
        meal: true,
        food: { select: FOOD_SELECT },
      },
    }),
  ]);
};

export const updateUserFood = (id: string, data: UpdateUserFood['body']) => {
  return prisma.userFood.update({ where: { id }, data });
};

export const deleteUserFood = (id: string) => {
  return prisma.userFood.delete({ where: { id } });
};
