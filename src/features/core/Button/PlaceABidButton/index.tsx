import React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';

import _ from 'lodash';

import PaymentModal from './Payment';

import { BaseButton } from '@/components/Button';
import { AuctionCard } from '@/typings/auction';
import { checkExpiredTime } from '@/utils/date';
import { AppState } from '@/store';
import { getFullName } from '@/utils/user';

type Props = ButtonProps & {
  item: AuctionCard;
  onSuccess?: () => void;
};

const PlaceABidButton = ({ item, disabled, onSuccess, ...props }: Props) => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleToggleButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onOpen();
  };

  const nftBuyings = useSelector((state: AppState) => state.market.nftBuyings);
  const isBuying = nftBuyings.includes(item?.id);

  const winnerBid = _.get(item, 'winnerBid.bidder');

  if (winnerBid) {
    return (
      <BaseButton variant="light" isDisabled={true} size={['sm', 'sm', 'lg']}>
        {t('winner', { name: getFullName(winnerBid) })}
      </BaseButton>
    );
  }

  return (
    <React.Fragment>
      <BaseButton
        variant="secondaryLight"
        onClick={handleToggleButton}
        isDisabled={
          checkExpiredTime(item?.auctionEndDate) || isBuying || disabled
        }
        isLoading={isBuying}
        size={['sm', 'sm', 'lg']}
        {...props}
      >
        {t('place_a_bid')}
      </BaseButton>
      <PaymentModal
        isOpen={isOpen}
        onClose={onClose}
        item={item}
        onSuccess={onSuccess}
      />
    </React.Fragment>
  );
};

export default PlaceABidButton;
