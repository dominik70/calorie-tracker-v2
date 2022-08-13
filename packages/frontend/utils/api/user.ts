import { Login, Register } from '@calorie-tracker/common';
import { fetcher } from '../fetcher';

export const getSession = () => {
  return fetcher('/sessions/me');
};

export const deleteSession = () => {
  return fetcher('/sessions/me', { method: 'DELETE' });
};

export const createSession = (data: Login) => {
  return fetcher('/sessions', {
    method: 'POST',
    body: data,
  });
};

export const createUser = (data: Register) => {
  return fetcher('/users', {
    method: 'POST',
    body: data,
  });
};
