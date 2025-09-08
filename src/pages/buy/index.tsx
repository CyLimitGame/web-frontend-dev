import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const BuyNftPage = () => {
  return <div>Buy</div>;
};

export default BuyNftPage;
