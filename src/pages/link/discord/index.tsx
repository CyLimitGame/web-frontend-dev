import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LinkDiscord from '@/features/LinkDiscord';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const LinkDiscordPage = () => {
  return <LinkDiscord />;
};

export default LinkDiscordPage;
