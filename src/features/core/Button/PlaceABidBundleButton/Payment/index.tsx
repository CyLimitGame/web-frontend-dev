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

import { BaseModal } from '@/components/Modal';
import StripeProvider from '@/shared/StripeProvider';
import { addNftBuying } from '@/store/market/market.slice';
import { useToastMessage } from '@/hooks/useToastMessage';
import { BundleCard } from '@/typings/bundle';

type Props = Omit<ModalProps, 'children'> & {
  item: BundleCard;
};

const PaymentModal = ({ item, ...props }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const toast = useToastMessage();

  const { onClose } = props;

  const handleSuccess = () => {
    onClose();
    toast({
      title: t('processing'),
      description: t('message:payment_processing'),
      status: 'info',
    });
    dispatch(addNftBuying(item.id));
  };

  return (
    <BaseModal title="payment" isUseDrawerForMobile closeable {...props}>
      <Tabs isFitted>
        <TabList>
          <Tab>{t('balance')}</Tab>
          <Tab color="gray.400">{t('credit_card')}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <BalancePayment item={item} onSuccess={handleSuccess} />
          </TabPanel>
          <TabPanel p={0}>
            <StripeProvider>
              <CreditCardPayment item={item} onSuccess={handleSuccess} />
            </StripeProvider>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BaseModal>
  );
};

export default PaymentModal;
