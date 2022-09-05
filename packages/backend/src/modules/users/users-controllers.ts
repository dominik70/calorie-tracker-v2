import status from 'http-status';
import type { NextFunction, Response } from 'express';
import {
  createUser,
  createUserFood,
  deleteUserFood,
  findUser,
  findUserFood,
  updateUserFood,
} from '../users/users-services';
import { Req } from '../../types';
import { AppError } from '../../utils/errors/AppError';
import {
  CreateUser,
  CreateUserFood,
  DeleteUserFood,
  GetUserFood,
  UpdateUserFood,
} from './users-schema';

export const createUserHandler = async (
  req: Req<CreateUser>,
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

export const getUserFood = async (req: Req<GetUserFood>, res: Response) => {
  const { userId } = req.params;
  const { from, to } = req.query;

  const food = await findUserFood(userId, new Date(from), new Date(to));

  res.json(food);
};

export const createUserFoodHandler = async (
  req: Req<CreateUserFood>,
  res: Response
) => {
  const data = req.body;
  const { userId } = req.params;

  const newUserFood = await createUserFood(userId, data);

  res.status(status.CREATED).json(newUserFood);
};

export const updateUserFoodHandler = async (
  req: Req<UpdateUserFood>,
  res: Response
) => {
  const data = req.body;
  const { id } = req.params;

  const updatedFood = await updateUserFood(id, data);

  res.json(updatedFood);
};

export const deleteUserFoodHandler = async (
  req: Req<DeleteUserFood>,
  res: Response
) => {
  const { id } = req.params;
  await deleteUserFood(id);

  res.json({ id });
};
