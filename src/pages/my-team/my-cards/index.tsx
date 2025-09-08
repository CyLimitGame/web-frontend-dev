import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MyCards from '@/features/MyCards';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const MyCardsPage = () => {
  return <MyCards />;
};

export default MyCardsPage;
