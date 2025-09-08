import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LegalsNotice from '@/features/LegalsNotice';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const LegalsNoticePage = () => {
  return <LegalsNotice />;
};

export default LegalsNoticePage;
