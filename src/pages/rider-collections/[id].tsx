import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import RiderCollections from '@/features/RiderCollections';

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

const RiderCollectionsPage = () => {
  return <RiderCollections />;
};

export default RiderCollectionsPage;
