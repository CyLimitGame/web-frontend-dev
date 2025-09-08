import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ViewNotification from '@/features/ViewNotification';

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

const ViewNotificationPage = () => {
  return <ViewNotification />;
};

export default ViewNotificationPage;
