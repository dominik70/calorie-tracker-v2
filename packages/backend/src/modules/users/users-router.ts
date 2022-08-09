import { registerSchema } from '@calorie-tracker/common';
import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../common/validate';
import { createUserHandler } from './users-controllers';

const usersRouter = Router();

usersRouter.post(
  '/',
  validate(z.object({ body: registerSchema })),
  createUserHandler
);

export { usersRouter };
