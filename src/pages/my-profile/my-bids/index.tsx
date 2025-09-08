import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MyBids from '@/features/MyBids';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const MyBidsPage = () => {
  return <MyBids />;
};

export default MyBidsPage;
