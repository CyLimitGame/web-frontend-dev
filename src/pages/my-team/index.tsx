import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MyTeam from '@/features/MyTeam';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const MyteamPage = () => {
  return <MyTeam />;
};

export default MyteamPage;
