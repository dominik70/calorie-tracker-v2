import status from 'http-status';
import { RequestHandler } from 'express';
import { AppError } from '../../utils/errors/AppError';

export const authenticate: RequestHandler = (req, res, next) => {
  const user = req.session.user;

  if (!user) {
    return next(new AppError('You are not authorized', status.UNAUTHORIZED));
  }

  next();
};
