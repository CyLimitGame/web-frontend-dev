import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CookiesPolicy from '@/features/CookiesPolicy';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const CookiesPolicyPage = () => {
  return <CookiesPolicy />;
};

export default CookiesPolicyPage;
