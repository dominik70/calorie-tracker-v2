import { loginSchema } from '@calorie-tracker/common';
import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../common/validate';
import { deleteSession, getSession, createSession } from './auth-controllers';

const authRouter = Router();

authRouter.post('/', validate(z.object({ body: loginSchema })), createSession);
authRouter.get('/me', getSession);
authRouter.delete('/me', deleteSession);

export { authRouter };
