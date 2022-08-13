import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ErrorType, User } from '../types';
import {
  createSession,
  createUser,
  deleteSession,
  getSession,
} from '../utils/api/user';

const QUERY_KEY = ['user'];

export const useUser = () => {
  const queryClient = useQueryClient();
  const { data: user, ...rest } = useQuery<User>(QUERY_KEY, getSession, {
    staleTime: Infinity,
    retry: false,
  });

  const setUser = (user: User | null) => {
    queryClient.setQueryData(QUERY_KEY, user);
  };

  const signUpMutation = useMutation<
    { email: string; id: string },
    ErrorType,
    { email: string; password: string; confirmPassword: string }
  >(createUser, {
    onSuccess: setUser,
  });

  const signInMutation = useMutation<
    { email: string; id: string },
    ErrorType,
    { email: string; password: string }
  >(createSession, {
    onSuccess: setUser,
  });

  const signOutMutation = useMutation(deleteSession, {
    onSuccess: () => {
      setUser(null);
    },
  });

  return {
    user,
    signUpMutation,
    signInMutation,
    signOutMutation,
    ...rest,
  };
};
