import { ZodError } from 'zod';

export const formatError = (error: ZodError) => {
  return error.issues
    .map(({ message, path }) => `${path.at(-1)} ${message}`.toLowerCase())
    .join(', ');
};
