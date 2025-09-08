import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Home from '@/features/Market';
import MainLayout from '@/layouts/MainLayout';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const Index = () => {
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
};

export default Index;
