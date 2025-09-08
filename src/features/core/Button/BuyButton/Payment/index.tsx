import React from 'react';
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  ModalProps,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';

import BalancePayment from './BalancePayment';
import CreditCardPayment from './CreditCardPayment';
import RampPayment from './RampPayment';

import { BaseModal } from '@/components/Modal';
import { CardItem } from '@/typings/card';
import StripeProvider from '@/shared/StripeProvider';
import { useToastMessage } from '@/hooks/useToastMessage';
import { addNftBuying } from '@/store/market/market.slice';
import { useGetCardDetail } from '@/queries/useCard';
import { MarketType } from '@/typings/card.enum';

type Props = Omit<ModalProps, 'children'> & {
  item: CardItem;
  onSuccess?: () => void;
};

const PaymentModal = ({ item, onSuccess, ...props }: Props) => {
  const { t } = useTranslation();
  const toast = useToastMessage();
  const dispatch = useDispatch();

  const { onClose, isOpen } = props;

  const handleSuccess = () => {
    onClose();
    toast({
      title: t('processing'),
      description: t('message:payment_processing'),
      status: 'info',
    });
    dispatch(addNftBuying(item.id));
    onSuccess && onSuccess();
  };

  const { data, isLoading } = useGetCardDetail(
    item?.id,
    MarketType.FIXED,
    !!isOpen
  );

  const isRampPayment = item?.fixedPrice > 10;

  return (
    <BaseModal title="payment" isUseDrawerForMobile closeable {...props}>
      <Tabs isFitted>
        <TabList>
          <Tab>{t('balance')}</Tab>
          <Tab>{t('credit_card')}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <BalancePayment
              item={(data || item) as CardItem}
              onSuccess={handleSuccess}
              isLoadingFee={isLoading}
            />
          </TabPanel>
          <TabPanel p={0}>
            {isRampPayment ? (
              <RampPayment
                item={(data || item) as CardItem}
                isLoadingFee={isLoading}
                onClose={onClose}
              />
            ) : (
              <StripeProvider>
                <CreditCardPayment
                  item={(data || item) as CardItem}
                  onSuccess={handleSuccess}
                  isLoadingFee={isLoading}
                />
              </StripeProvider>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BaseModal>
  );
};

export default PaymentModal;
