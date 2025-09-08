import React from 'react';
import { useTranslation } from 'next-i18next';
import moment from 'moment';
import _ from 'lodash';

import TakeRewardButton from './TakeRewardButton';

import { BaseButton } from '@/components/Button';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import { GameModel } from '@/typings/game';

type Props = {
  item: GameModel;
};

type WatchButtonProps = {
  item: GameModel;
};

export const handleShowRanking = ({
  isUsingRankingTemplate,
  rankingUrl,
  id,
}: GameModel) => {
  if (isUsingRankingTemplate) {
    return navigateTo(`${PATH.GAME_RANKINGS}/${id}`);
  }

  if (!isUsingRankingTemplate && rankingUrl) {
    return window.open(rankingUrl, '_blank');
  }
};

const WatchButton = ({ item }: WatchButtonProps) => {
  const { t } = useTranslation();

  return (
    <BaseButton
      width="100%"
      variant="purple-gradient"
      onClick={() => handleShowRanking(item)}
    >
      {t('watch')}
    </BaseButton>
  );
};

const ButtonType = ({ item }: Props) => {
  const { t } = useTranslation();

  const startDate = _.get(item, 'startDate');
  const endDate = _.get(item, 'endDate');
  const id = _.get(item, 'id');

  const _renderButton = () => {
    const isComing = moment().isBefore(startDate);
    const isInProgress =
      moment().isAfter(startDate) && moment().isBefore(endDate);
    const isPast = moment().isAfter(endDate);

    if (isComing) {
      return (
        <BaseButton
          width="100%"
          variant="purple-gradient"
          onClick={() => navigateTo(`${PATH.PATICIPATE}/${id}`)}
        >
          {t('participate')}
        </BaseButton>
      );
    }
    if (isInProgress) {
      return <WatchButton item={item} />;
    }
    if (isPast) {
      return (
        <TakeRewardButton
          gameId={id}
          isRewardConfirmed={item?.isRewardConfirmed}
        />
      );
    }

    return null;
  };

  return <React.Fragment>{_renderButton()}</React.Fragment>;
};

export default ButtonType;
