import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ForgotPassword from '@/features/ForgotPassword';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const ForgotPasswordPage = () => {
  return <ForgotPassword />;
};

export default ForgotPasswordPage;
