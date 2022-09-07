import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Navigation } from '../components/layout/navigation/Navigation';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DateProvider } from '../contexts/DateContext';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';

export const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <>
      <Head>
        <title>my calorie</title>
      </Head>
      <DateProvider>
        <QueryClientProvider client={queryClient}>
          <Navigation />
          <Layout>
            <Component {...pageProps} />
            <ToastContainer
              position="bottom-center"
              newestOnTop
              closeOnClick
              draggable
              pauseOnFocusLoss={false}
              pauseOnHover
              limit={3}
              autoClose={4000}
            />
          </Layout>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </DateProvider>
    </>
  );
};

export default App;
