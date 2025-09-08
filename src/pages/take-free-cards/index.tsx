import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import TakeFreeCards from '@/features/TakeFreeCards';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const TakeFreeCardsPage = () => {
  return <TakeFreeCards />;
};

export default TakeFreeCardsPage;
