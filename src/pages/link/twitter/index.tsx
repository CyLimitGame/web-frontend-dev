import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LinkTwitter from '@/features/LinkTwitter';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'message'])),
    },
  };
};

const LinkTwitterPage = () => {
  return <LinkTwitter />;
};

export default LinkTwitterPage;
