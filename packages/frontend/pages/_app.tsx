import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Navigation } from '../components/layout/navigation/Navigation';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DateProvider } from '../contexts/DateContext';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';

export const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>my calorie</title>
      </Head>
      <DateProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Layout>
              <Navigation />
              <Component {...pageProps} />
              <ToastContainer
                position="bottom-center"
                newestOnTop
                closeOnClick
                draggable
                pauseOnFocusLoss={false}
                pauseOnHover
                limit={5}
                autoClose={4000}
              />
            </Layout>
          </Hydrate>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </DateProvider>
    </>
  );
};

export default App;
