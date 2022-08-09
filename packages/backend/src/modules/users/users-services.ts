import bcrypt from 'bcrypt';
import { prisma } from '../../db/prisma';

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({ data: { email, password: hashedPassword } });
};

export const findUser = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};
