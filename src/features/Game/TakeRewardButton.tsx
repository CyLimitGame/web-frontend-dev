import React from 'react';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';

import { BaseButton } from '@/components/Button';
import { navigateToTakeReward } from '@/utils/navigation';
import { useCheckRewardStatus } from '@/queries/useGame';
import { GameRewardStatusEnum } from '@/typings/game.enum';
import { useToastMessage } from '@/hooks/useToastMessage';

type Props = {
  gameId: string;
  isRewardConfirmed: boolean;
};

const TakeRewardButton = ({ gameId, isRewardConfirmed }: Props) => {
  const { t } = useTranslation();
  const { mutateAsync, isLoading } = useCheckRewardStatus();
  const toast = useToastMessage();

  const handlCheckReward = async () => {
    const res = await mutateAsync(gameId);
    const status = _.get(res, 'status', '') as GameRewardStatusEnum;

    if (status === GameRewardStatusEnum.WAITING_TO_CLAIM) {
      return navigateToTakeReward(gameId);
    }

    if (status === GameRewardStatusEnum.CLAIMED) {
      return toast({
        description: t('you_already_claimed'),
      });
    }

    return toast({ description: t('you_dont_have_reward') });
  };

  return (
    <BaseButton
      size="md"
      variant="outline"
      color="error.500"
      isLoading={isLoading}
      onClick={handlCheckReward}
      isDisabled={!isRewardConfirmed}
    >
      {t('rewards')}
    </BaseButton>
  );
};

export default TakeRewardButton;
