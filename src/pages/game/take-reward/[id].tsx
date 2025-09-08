import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import TakeReward from '@/features/TakeReward';

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

const TakeRewardPage = () => {
  return <TakeReward />;
};

export default TakeRewardPage;
