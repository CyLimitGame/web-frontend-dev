import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ResetPassword from '@/features/ResetPassword';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const ResetPasswordPage = () => {
  return <ResetPassword />;
};

export default ResetPasswordPage;
