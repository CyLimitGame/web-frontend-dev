import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MyHistorySales from '@/features/MyHistorySales';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const MyHistorySalesPage = () => {
  return <MyHistorySales />;
};

export default MyHistorySalesPage;
