import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import User from '@/features/User';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

const UserPage = () => {
  return <User />;
};

export default UserPage;
