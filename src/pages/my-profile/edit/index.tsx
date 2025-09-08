import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import EditProfile from '@/features/EditProfile';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const EditProfilePage = () => {
  return <EditProfile />;
};

export default EditProfilePage;
