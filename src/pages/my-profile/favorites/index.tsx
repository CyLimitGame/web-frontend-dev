import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MyFavorites from '@/features/MyFavorites';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const MyFavoritesPage = () => {
  return <MyFavorites />;
};

export default MyFavoritesPage;
