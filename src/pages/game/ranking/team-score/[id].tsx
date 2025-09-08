import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import TeamScore from '@/features/TeamScore';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

const TeamScorePage = () => {
  return <TeamScore />;
};

export default TeamScorePage;
