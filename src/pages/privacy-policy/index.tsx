import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PrivacyPolicy from '@/features/PrivacyPolicy';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const PrivacyPolicyPage = () => {
  return <PrivacyPolicy />;
};

export default PrivacyPolicyPage;
