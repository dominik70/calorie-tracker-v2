import { Router } from 'express';
import { validate } from '../../utils/validate';
import {
  createUserFoodHandler,
  createUserHandler,
  deleteUserFoodHandler,
  getUserFood,
  updateUserFoodHandler,
} from './users-controllers';
import {
  createFoodSchema,
  createUserSchema,
  deleteFoodSchema,
  getFoodSchema,
  updateFoodSchema,
} from './users-schema';
import { authorize } from './users-middlewares';

const usersRouter = Router();

usersRouter.post('/', validate(createUserSchema), createUserHandler);
usersRouter.get(
  '/:userId/food',
  [authorize, validate(getFoodSchema)],
  getUserFood
);
usersRouter.post(
  '/:userId/food',
  [authorize, validate(createFoodSchema)],
  createUserFoodHandler
);
usersRouter.patch(
  '/:userId/food/:id',
  authorize,
  [authorize, validate(updateFoodSchema)],
  updateUserFoodHandler
);
usersRouter.delete(
  '/:userId/food/:id',
  [authorize, validate(deleteFoodSchema)],
  deleteUserFoodHandler
);

export { usersRouter };
