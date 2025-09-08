import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Referrals from '@/features/Referrals';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const ReferralsPage = () => {
  return <Referrals />;
};

export default ReferralsPage;
