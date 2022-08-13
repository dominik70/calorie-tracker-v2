import { GetServerSideProps } from 'next';
import { fetcher } from '../utils/fetcher';

const Profile = () => {
  return <div>Under development</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { cookie } = req.headers;
  const options = cookie ? { headers: { cookie } } : {};

  const user = await fetcher('/sessions/me', { config: options });

  if (!user) {
    return {
      props: {},
      redirect: { destination: '/sign-in?from=profile' },
    };
  }

  return { props: {} };
};

export default Profile;
