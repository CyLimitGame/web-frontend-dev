import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Ranking from '@/features/Ranking';

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

const RankingPage = () => {
  return <Ranking />;
};

export default RankingPage;
