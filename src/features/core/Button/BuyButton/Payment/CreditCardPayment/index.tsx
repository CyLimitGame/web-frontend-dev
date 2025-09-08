import React from 'react';
import { Box, Flex, Spinner, useDisclosure } from '@chakra-ui/react';
import { CardElement } from '@stripe/react-stripe-js';
import { useTranslation } from 'next-i18next';

import { Text } from '@/components/Common';
import { CardItem } from '@/typings/card';
import BaseButton from '@/components/Button/BaseButton';
import { usePayment } from '@/queries/usePayment';
import { API_PATH } from '@/apis';
import { formatPrice, getEuroPrice } from '@/utils/number';
import { useGetCurrencyExchange } from '@/queries/useExchange';
import { useListenFiatChange } from '@/queries/useListenFiatChange';

type Props = {
  item: CardItem;
  onSuccess: () => void;
  isLoadingFee: boolean;
};

const CreditCardPayment = ({ item, onSuccess, isLoadingFee }: Props) => {
  const {
    isOpen: isDisable,
    onOpen: onDisable,
    onClose: onEnable,
  } = useDisclosure();
  const { t } = useTranslation();
  const {
    handleSubmitForm,
    handleChange,
    error,
    succeeded,
    processing,
    disabled,
  } = usePayment({
    key: 'nftId',
    id: item.id,
    path: API_PATH.PAYMENT_INTENTS_FIXED,
    onSuccess,
  });

  const { data: exchange, refetch } = useGetCurrencyExchange();
  const euroPrice = getEuroPrice(item.stripeTotalAmount, exchange);

  const handleSubmit = () => {
    handleSubmitForm({});
  };

  useListenFiatChange({ onDisable });

  const handleRefresh = () => {
    refetch();
    onEnable();
  };

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mt={2} textAlign="center">
        $ {formatPrice(item.fixedPrice)}*
      </Text>
      {isLoadingFee ? (
        <Flex justifyContent="center" my={3}>
          <Spinner />
        </Flex>
      ) : (
        <React.Fragment>
          <Flex justifyContent="space-between" textDecoration="line-through">
            <Text translateText="estimated_ramp_fees" />
            <Text>≈ ${formatPrice(item.rampFee)}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text translateText="cylimit_fees" />
            <Text>≈ ${formatPrice(item.stripeFee)}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text translateText="total_paid" fontWeight="bold" />
            <Text fontWeight="bold">
              ≈ ${formatPrice(item.stripeTotalAmount)}
            </Text>
          </Flex>
          {!isDisable ? (
            <Flex justifyContent="space-between">
              <Text
                translateText="total_paid_in_euro"
                fontWeight="bold"
                color="primary.500"
              />
              <Text fontWeight="bold" color="primary.500">
                ≈ €{formatPrice(euroPrice)}
              </Text>
            </Flex>
          ) : (
            <Flex mt={2}>
              <Text
                textAlign="center"
                fontSize="sm"
                w="100%"
                cursor="pointer"
                color="primary.500"
                _hover={{
                  color: 'primary.600',
                }}
                onClick={handleRefresh}
                translateText="the_rate_is_changed_please_click_here_to_refresh"
              />
            </Flex>
          )}
        </React.Fragment>
      )}
      <Box my={4}>
        <CardElement
          id="card-element"
          options={{
            style: {
              base: {
                color: 'white',
              },
            },
          }}
          onChange={handleChange}
        />
      </Box>
      {error && (
        <Text fontSize="sm" color="error.500">
          {error}
        </Text>
      )}
      <BaseButton
        w="100%"
        variant="secondaryLight"
        mt={2}
        isDisabled={processing || disabled || succeeded || !!error || isDisable}
        isLoading={processing}
        onClick={handleSubmit}
      >
        {t('buy')}
      </BaseButton>
      <Text fontSize="sm" color="gray.400" mt={4}>
        {t('you_buy_on')}
      </Text>
      <Text>{item.name}</Text>
      <Text fontSize="sm" color="gray.400" mt={4}>
        *{t('payment_note_euro')}
      </Text>
    </Box>
  );
};

export default CreditCardPayment;
