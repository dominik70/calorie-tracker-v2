import { Router } from 'express';
import { validate } from '../common/validate';
import { getFood, getFoods, getCategories } from './food-controller';
import { getFoodSchema, getFoodsSchema } from './food-schema';

const foodRouter = Router();

foodRouter.get('/', validate(getFoodsSchema), getFoods);
foodRouter.get('/categories', getCategories);
foodRouter.get('/:id', validate(getFoodSchema), getFood);

export { foodRouter };
