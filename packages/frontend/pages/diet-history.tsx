import { GetServerSideProps } from 'next';
import { DietHistory } from '../components/dietHistory/DietHistory';
import { fetcher } from '../utils/fetcher';


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { cookie } = req.headers;
  const options = cookie ? { headers: { cookie } } : {};

  const user = await fetcher('/sessions/me', { config: options });

  if (!user) {
    return {
      props: {},
      redirect: { destination: '/sign-in?from=diet-history' },
    };
  }

  return { props: {} };
};

export default DietHistory;
