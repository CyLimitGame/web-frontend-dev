import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Help from '@/features/Help';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const HelpPage = () => {
  return <Help />;
};

export default HelpPage;
