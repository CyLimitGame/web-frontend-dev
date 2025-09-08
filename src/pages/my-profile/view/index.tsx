import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ViewProfile from '@/features/ViewProfile';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    notFound: true,
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const ViewProfilePage = () => {
  return <ViewProfile />;
};

export default ViewProfilePage;
