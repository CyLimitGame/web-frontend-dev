import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AffiliateTakeReward from '@/features/AffiliateTakeReward';

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

const AffiliateTakeRewardPage = () => {
  return <AffiliateTakeReward />;
};

export default AffiliateTakeRewardPage;
