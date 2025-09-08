import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ReferralGifts from '@/features/ReferralGifts';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const ReferralGiftsPage = () => {
  return <ReferralGifts />;
};

export default ReferralGiftsPage;
