import React from 'react';
import { useTranslation } from 'next-i18next';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import PaymentModal from './Payment';

import { BaseButton } from '@/components/Button';
import { useGetUserProfile } from '@/queries/useUser';
import { CardItem } from '@/typings/card';
import { AppState } from '@/store';

type Props = ButtonProps & {
  item: CardItem;
  onSuccess?: () => void;
};

const BuyButton = ({ item, onSuccess, ...props }: Props) => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data: user } = useGetUserProfile();

  const nftBuyings = useSelector((state: AppState) => state.market.nftBuyings);
  const isBuying = nftBuyings.includes(item?.id) || !!item?.isLocked;

  const handleClickButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onOpen();
  };

  return (
    <React.Fragment>
      <BaseButton
        variant="secondaryLight"
        onClick={(e) => handleClickButton(e)}
        isDisabled={user?.id === item?.ownerId || isBuying}
        isLoading={isBuying}
        size={['sm', 'sm', 'lg']}
        {...props}
      >
        {t('buy')}
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

export default BuyButton;
