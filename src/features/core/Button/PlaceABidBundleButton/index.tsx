import React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';

import PaymentModal from './Payment';

import { BaseButton } from '@/components/Button';
import { checkExpiredTime } from '@/utils/date';
import { BundleCard } from '@/typings/bundle';
import { AppState } from '@/store';

type Props = ButtonProps & {
  item: BundleCard;
};

const PlaceABidBundleButton = ({ item, disabled, ...props }: Props) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleToggleButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onOpen();
  };

  const nftBuyings = useSelector((state: AppState) => state.market.nftBuyings);
  const isBuying = nftBuyings.includes(item?.id);

  return (
    <React.Fragment>
      <BaseButton
        variant="light"
        onClick={handleToggleButton}
        isDisabled={
          checkExpiredTime(item?.auctionEndDate) || isBuying || disabled
        }
        isLoading={isBuying}
        {...props}
      >
        {t('place_a_bid')}
      </BaseButton>
      <PaymentModal isOpen={isOpen} onClose={onClose} item={item} />
    </React.Fragment>
  );
};

export default PlaceABidBundleButton;
