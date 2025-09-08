import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Partners from '@/features/Partners';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const PartnersPage = () => {
  return <Partners />;
};

export default PartnersPage;
