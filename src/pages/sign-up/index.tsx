import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SignUp from '@/features/SignUp';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
