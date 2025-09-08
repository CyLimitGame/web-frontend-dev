import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SwapCard from '@/features/SwapCard';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const SwapCardPage = () => {
  return <SwapCard />;
};

export default SwapCardPage;
