import status from 'http-status';
import type { NextFunction, Request, Response } from 'express';
import { SESSION_NAME } from '../../utils/constants';
import { verifyUser } from './auth-services';
import { AppError } from '../../utils/errors/AppError';
import { Req } from '../../types';
import { CreateSession } from './auth-schema';

export const createSession = async (req: Req<CreateSession>, res: Response) => {
  const { email, password } = req.body;

  const user = await verifyUser(email, password);

  req.session.user = { id: user.id, email: user.email };
  const { password: userPassword, ...userResponse } = user;

  res.json(userResponse);
};

export const getSession = async (req: Request, res: Response) => {
  const { user } = req.session;

  if (!user) {
    return res.json(null);
  }

  res.json(user);
};

export const deleteSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.session.destroy((error) => {
    if (error) {
      return next(
        new AppError('Failed to log out', status.INTERNAL_SERVER_ERROR)
      );
    }

    res.clearCookie(SESSION_NAME).json({ message: 'successfully signed out' });
  });
};
