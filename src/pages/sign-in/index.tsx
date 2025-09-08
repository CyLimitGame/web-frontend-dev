import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SignIn from '@/features/SignIn';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;
