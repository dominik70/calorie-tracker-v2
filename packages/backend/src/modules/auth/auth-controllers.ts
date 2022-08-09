import status from 'http-status';
import type { NextFunction, Request, Response } from 'express';
import { SESSION_NAME } from '../../utils/constants';
import { verifyUser } from './auth-services';
import { Login } from '@calorie-tracker/common';
import { AppError } from '../../errors/AppError';
import { Req } from '../../types';

export const createSession = async (
  req: Req<{ body: Login }>,
  res: Response,
  next: NextFunction
) => {
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
