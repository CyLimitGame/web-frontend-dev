import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Game from '@/features/Game';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    notFound: true,
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const GamePage = () => {
  return <Game />;
};

export default GamePage;
