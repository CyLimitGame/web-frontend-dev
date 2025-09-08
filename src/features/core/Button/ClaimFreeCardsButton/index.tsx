import React from 'react';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';
import { ButtonProps } from '@chakra-ui/react';

import { BaseButton } from '@/components/Button';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import { useGetUserProfile } from '@/queries/useUser';

const ClaimFreeCardsButton = (props: ButtonProps) => {
  const { data } = useGetUserProfile();
  const freeCardsTeamStatus = _.get(data, 'freeCardsTeamStatus', '');

  const { t } = useTranslation();

  if (!data || freeCardsTeamStatus === 'done') {
    return null;
  }

  return (
    <BaseButton
      variant="light"
      onClick={() => navigateTo(PATH.TAKE_FREE_CARDS)}
      size="xs"
      {...props}
    >
      {t('claim_free_cards')}
    </BaseButton>
  );
};

export default ClaimFreeCardsButton;
