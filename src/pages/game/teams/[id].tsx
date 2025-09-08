import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import GameTeams from '@/features/GameTeams';

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

const GameTeamsPage = () => {
  return <GameTeams />;
};

export default GameTeamsPage;
