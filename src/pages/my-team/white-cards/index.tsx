import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import WhiteCards from '@/features/WhiteCards';

// TODO delete this feature when the new feature working good
export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    notFound: true,
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const WhiteCardsPage = () => {
  return <WhiteCards />;
};

export default WhiteCardsPage;
