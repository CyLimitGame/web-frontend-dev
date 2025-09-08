import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import TermsOfService from '@/features/TermsOfService';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const TermsOfServicePage = () => {
  return <TermsOfService />;
};

export default TermsOfServicePage;
