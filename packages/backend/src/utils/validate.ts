import status from 'http-status';
import { RequestHandler } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { AppError } from './errors/AppError';
import { formatError } from './errors/formatErrors';

export const validate =
  (schema: AnyZodObject): RequestHandler =>
  (req, res, next) => {
    const { body, query, params } = req;

    try {
      schema.parse({ body, query, params });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = formatError(error);
        return next(new AppError(message, status.BAD_REQUEST));
      }

      const err = error as Error;
      next(new AppError(err.message, status.BAD_REQUEST));
    }
  };
