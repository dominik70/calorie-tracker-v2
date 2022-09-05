import status from 'http-status';
import { RequestHandler } from 'express';
import { AppError } from '../../utils/errors/AppError';

export const authorize: RequestHandler = (req, res, next) => {
  const { userId } = req.params;
  const { user } = req.session;

  if (userId !== user?.id) {
    next(new AppError('You are not authorized', status.UNAUTHORIZED));
  }

  next();
};
