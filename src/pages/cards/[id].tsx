import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Cards from '@/features/Cards';

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
    fallback: 'blocking',
  };
};

const CardsPage = () => {
  return <Cards />;
};

export default CardsPage;
