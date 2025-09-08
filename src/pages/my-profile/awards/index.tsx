import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Awards from '@/features/Awards';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const AwardsPage = () => {
  return <Awards />;
};

export default AwardsPage;
