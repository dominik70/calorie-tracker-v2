import status from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { GetFood, GetFoods } from './food-schema';
import { Req } from '../../types';
import { findCategories, findFood, findFoods } from './food-services';
import { AppError } from '../../errors/AppError';

export const getFood = async (
  req: Req<GetFood>,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  const food = await findFood(id);

  if (!food) {
    return next(
      new AppError(`Cannot find the food with id ${id}`, status.NOT_FOUND)
    );
  }

  res.json(food);
};

export const getFoods = async (req: Req<GetFoods>, res: Response) => {
  const { query, page, category } = req.query;

  const food = await findFoods(query, page, category);

  res.json(food);
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await findCategories();

  res.json(categories);
};
