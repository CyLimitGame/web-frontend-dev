import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import OpenThePack from '@/features/OpenThePack';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const OpenThePackPage = () => {
  return <OpenThePack />;
};

export default OpenThePackPage;
