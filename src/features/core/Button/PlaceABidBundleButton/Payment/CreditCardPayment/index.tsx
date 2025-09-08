import React from 'react';
import { Box } from '@chakra-ui/react';
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
import { Bid } from '@/typings/auction';
import { API_PATH } from '@/apis';
import { BundleCard } from '@/typings/bundle';

type Props = {
  item: BundleCard;
  onSuccess: () => void;
};

const CreditCardPayment = ({ item, onSuccess }: Props) => {
  const { t } = useTranslation();

  const {
    handleSubmitForm,
    handleChange,
    error,
    succeeded,
    processing,
    disabled,
  } = usePayment({
    key: 'bundleId',
    id: item.id,
    path: API_PATH.PAYMENT_INTENTS_BUNDLE,
    queryKey: [API_PATH.GET_CARD, item.id],
    onSuccess,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Bid>({
    resolver: yupResolver(bidSchema(t, item)),
    defaultValues: {
      amount: getCurrentPrice(item),
    },
  });

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Box>
        <TextInput
          placeholder={t('type_amount')}
          errors={errors}
          {...register('amount')}
        />
        <Box my={4}>
          <CardElement id="card-element" options={{}} onChange={handleChange} />
        </Box>
        {error && (
          <Text fontSize="sm" color="error.500">
            {error}
          </Text>
        )}
        <BaseButton
          w="100%"
          variant="light"
          mt={2}
          isDisabled={processing || disabled || succeeded || !!error}
          isLoading={processing}
          type="submit"
        >
          {t('bid')}
        </BaseButton>
        <Text fontSize="sm" color="gray.400" mt={4}>
          {t('you_bid_on')}
        </Text>
        {item?.nfts?.map((nft) => (
          <Text key={nft.id}>{nft.name}</Text>
        ))}
        <Text fontSize="sm" color="gray.400" mt={4}>
          {t('payment_note')}
        </Text>
      </Box>
    </form>
  );
};

export default CreditCardPayment;
