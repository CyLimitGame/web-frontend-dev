import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AllCards from '@/features/AllCards';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const AllCardsPage = () => {
  return <AllCards />;
};

export default AllCardsPage;
