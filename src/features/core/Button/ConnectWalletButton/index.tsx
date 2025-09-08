import React from 'react';
import { useTranslation } from 'next-i18next';

import { BaseButton } from '@/components/Button';

const ConnectWalletButton = () => {
  const { t } = useTranslation();
  return <BaseButton colorScheme="primary">{t('connect_wallet')}</BaseButton>;
};

export default ConnectWalletButton;
