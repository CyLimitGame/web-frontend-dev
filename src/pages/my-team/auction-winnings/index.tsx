import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AuctionWinnings from '@/features/AuctionWinnings';

// TODO remove feature when the new feature good working
export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    notFound: true,
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const AuctionWinningsPage = () => {
  return <AuctionWinnings />;
};

export default AuctionWinningsPage;
