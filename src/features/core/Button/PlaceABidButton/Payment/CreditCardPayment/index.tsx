import React, { useEffect } from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { CardElement } from '@stripe/react-stripe-js';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import bidSchema from '../validate';

import { Text } from '@/components/Common';
import { usePayment } from '@/queries/usePayment';
import BaseButton from '@/components/Button/BaseButton';
import { getCurrentPrice } from '@/utils/card';
import { TextInput } from '@/components/Inputs';
import { AuctionCard, Bid } from '@/typings/auction';
import { API_PATH } from '@/apis';
import { formatPrice, getEuroPrice, getUsdPrice } from '@/utils/number';
import { useGetCurrencyExchange } from '@/queries/useExchange';
import { useListenFiatChange } from '@/queries/useListenFiatChange';

type Props = {
  item: AuctionCard;
  onSuccess: () => void;
};

const CreditCardPayment = ({ item, onSuccess }: Props) => {
  const { t } = useTranslation();
  const {
    isOpen: isDisable,
    onOpen: onDisable,
    onClose: onEnable,
  } = useDisclosure();

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
    path: API_PATH.PAYMENT_INTENTS_AUCTION,
    queryKey: [API_PATH.GET_CARD, item.id],
    onSuccess,
  });

  const { data: exchange, refetch } = useGetCurrencyExchange();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Bid>({
    resolver: yupResolver(bidSchema(t, item, exchange)),
  });

  const amount = watch('amount');
  const euroPrice = getEuroPrice(amount, exchange);

  useListenFiatChange({ onDisable });

  const handleRefresh = () => {
    refetch();
    onEnable();
  };

  useEffect(() => {
    if (exchange && item) {
      const usdPrice = getCurrentPrice(item);
      const euroPrice = getEuroPrice(usdPrice, exchange);
      if (euroPrice < 0.5) {
        setValue('amount', getUsdPrice(0.5, exchange));
      } else {
        setValue('amount', getCurrentPrice(item));
      }
    }
  }, [exchange, item]);

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Box>
        <TextInput
          placeholder={t('type_amount')}
          errors={errors}
          leftElement="$"
          {...register('amount')}
        />
        {!isDisable ? (
          <Flex justifyContent="space-between" mt={2}>
            <Text translateText="amount_to_be_paid" fontWeight="bold" />
            <Text fontWeight="bold">≈ €{formatPrice(euroPrice)}</Text>
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
        <Box my={4} color="white">
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
          isDisabled={
            processing || disabled || succeeded || !!error || isDisable
          }
          isLoading={processing}
          type="submit"
        >
          {t('bid')}
        </BaseButton>
        <Text fontSize="sm" color="gray.400" mt={4}>
          {t('you_bid_on')}
        </Text>
        <Text>{item.name}</Text>
        <Text fontSize="sm" color="gray.400" mt={4}>
          *{t('payment_note_euro')}
        </Text>
      </Box>
    </form>
  );
};

export default CreditCardPayment;
