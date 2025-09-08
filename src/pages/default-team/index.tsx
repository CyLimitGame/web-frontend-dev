import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SetDefaultTeam from '@/features/SetDefaultTeam';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const SetDefaultTeamPage = () => {
  return <SetDefaultTeam />;
};

export default SetDefaultTeamPage;
