import { Router } from 'express';
import { validate } from '../../utils/validate';
import { deleteSession, getSession, createSession } from './auth-controllers';
import { createSessionSchema } from './auth-schema';

const authRouter = Router();

authRouter.post('/', validate(createSessionSchema), createSession);
authRouter.get('/me', getSession);
authRouter.delete('/me', deleteSession);

export { authRouter };
