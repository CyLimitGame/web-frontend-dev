import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Follows from '@/features/Follows';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const FollowsPage = () => {
  return <Follows />;
};

export default FollowsPage;
