import React from 'react';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';

import { useCheckTeamsAlready } from '@/queries/useGame';
import { BaseButton } from '@/components/Button';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import { useToastMessage } from '@/hooks/useToastMessage';

type Props = {
  gameId: string;
};

const TeamCreatedButton = ({ gameId }: Props) => {
  const { t } = useTranslation();
  const { mutateAsync, isLoading } = useCheckTeamsAlready();
  const toast = useToastMessage();

  const handleClick = async () => {
    const res = await mutateAsync(gameId);
    if (!_.isEmpty(res)) {
      return navigateTo(`${PATH.WATCH_TEAMS}/${gameId}`);
    }

    return toast({ description: t('message:dont_have_team') });
  };

  return (
    <BaseButton
      mt={[2, 2, 8]}
      size="md"
      onClick={handleClick}
      isLoading={isLoading}
      w="100%"
      maxW="240px"
      variant="purple-gradient"
    >
      {t('team_created')}
    </BaseButton>
  );
};

export default TeamCreatedButton;
