import { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import { Loader } from '../components/shared/loader/Loader';
import { useUser } from '../hooks/useUser';

const withAuth = <T,>(Component: NextComponentType<T>) => {
  const Auth = (props: T) => {
    const { user, isLoading } = useUser();
    const router = useRouter();

    if (isLoading) {
      return <Loader />;
    }

    if (!user) {
      router.replace(`/sign-in?from=${router.pathname}`);
      return null;
    }

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
