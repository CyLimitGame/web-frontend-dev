import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Rewards from '@/features/Rewards';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const RewardsPage = () => {
  return <Rewards />;
};

export default RewardsPage;
