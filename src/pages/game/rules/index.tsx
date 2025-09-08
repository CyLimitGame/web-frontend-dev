import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Rules from '@/features/Rules';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    notFound: true,
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const RulesPage = () => {
  return <Rules />;
};

export default RulesPage;
