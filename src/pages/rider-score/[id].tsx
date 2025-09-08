import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import RiderCore from '@/features/RiderScore';

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

const RiderCorePage = () => {
  return <RiderCore />;
};

export default RiderCorePage;
