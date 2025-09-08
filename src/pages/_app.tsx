import { useState } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { appWithTranslation } from 'next-i18next';

import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';

import store from '@/store';
import theme from '@/theme';
import ErrorBoundary from '@/shared/ErrorBoundary';
import { useDefaultTheme } from '@/hooks/useDefaultTheme';
import GameProvider from '@/features/Game/GameContext';
import { NoticeLevelUp } from '@/features/core/Common';
import { PATH } from '@/constants/path';
// import AuthProvider from '@/shared/AuthProvider';

const PUBLIC_PATH = [
  PATH.SIGNIN,
  PATH.SIGNUP,
  PATH.FORGOT_PASSWORD,
  PATH.RESET_PASSWORD,
  PATH.EMAIL_VERIFIED,
  PATH.TERMS_OF_SERVICE,
];

const NextNProgress = dynamic(() => import('nextjs-progressbar'), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = router.pathname;

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { refetchOnWindowFocus: false },
        },
      })
  );

  // Set default theme only dark mode
  useDefaultTheme();

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>CyLimit</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content="CyLimit" />
      </Head>
      <Provider store={store}>
        <GameProvider>
          <QueryClientProvider client={queryClient}>
            <NextNProgress />
            {!PUBLIC_PATH.includes(pathname) && <NoticeLevelUp />}
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </QueryClientProvider>
        </GameProvider>
      </Provider>
    </ChakraProvider>
  );
}

export default appWithTranslation(MyApp);
