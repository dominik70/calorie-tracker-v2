import bcrypt from 'bcrypt';
import status from 'http-status';
import { AppError } from '../../utils/errors/AppError';
import { findUser } from '../users/users-services';

export const verifyUser = async (email: string, password: string) => {
  const user = await findUser(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError('Invalid email or password', status.BAD_REQUEST);
  }

  return user;
};
