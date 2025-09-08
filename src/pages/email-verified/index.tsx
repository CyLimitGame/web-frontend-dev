import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import VerifyEmail from '@/features/VerifyEmail';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const VerifyEmailPage = () => {
  return <VerifyEmail />;
};

export default VerifyEmailPage;
