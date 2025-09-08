import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BundleWinnings from '@/features/BundleWinnings';

// TODO remove feature when the new feature good working
export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      notFound: true,
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const BundleWinningsPage = () => {
  return <BundleWinnings />;
};

export default BundleWinningsPage;
