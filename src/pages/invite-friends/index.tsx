import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import InviteFriends from '@/features/InviteFriends';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const InviteFriendsPage = () => {
  return <InviteFriends />;
};

export default InviteFriendsPage;
