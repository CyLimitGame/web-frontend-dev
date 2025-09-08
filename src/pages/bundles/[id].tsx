import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Bundles from '@/features/Bundles';

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

const BundlesPage = () => {
  return <Bundles />;
};

export default BundlesPage;
