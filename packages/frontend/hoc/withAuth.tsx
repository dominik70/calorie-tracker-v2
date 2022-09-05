import { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Loader } from '../components/shared/loader/Loader';
import { useUser } from '../hooks/useUser';

export const withAuth = <T,>(Component: NextComponentType<T>) => {
  const Auth = (props: T) => {
    const { user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace(`/sign-in?from=${router.pathname}`);
      }
    }, [user]);

    if (isLoading) {
      return <Loader />;
    }

    return <Component {...props} />;
  };

  return Auth;
};
