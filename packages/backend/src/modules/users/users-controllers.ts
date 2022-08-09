import status from 'http-status';
import type { NextFunction, Response } from 'express';
import { createUser, findUser } from '../users/users-services';
import { Register } from '@calorie-tracker/common';
import { Req } from '../../types';
import { AppError } from '../../errors/AppError';

export const createUserHandler = async (
  req: Req<{ body: Register }>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const user = await findUser(email);

  if (user) {
    return next(new AppError('Email already taken', status.CONFLICT));
  }

  const { id } = await createUser(email, password);
  req.session.user = { id, email };

  res.status(status.CREATED).json({ id, email });
};
