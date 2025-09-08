import React from 'react';
import { Box } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import bidSchema from '../validate';

import { Text } from '@/components/Common';
import { formatPrice } from '@/utils/number';
import { useGetUserProfile } from '@/queries/useUser';
import { getCurrentPrice } from '@/utils/card';
import { AuctionCard, Bid } from '@/typings/auction';
import { TextInput } from '@/components/Inputs';
import { useBidItem } from '@/queries/useAuction';
import { BaseButton } from '@/components/Button';

type Props = {
  item: AuctionCard;
  onSuccess: () => void;
};

const BalancePayment = ({ item, onSuccess }: Props) => {
  const { data: userProfile } = useGetUserProfile();
  const { t } = useTranslation();
  const { mutateAsync, isLoading } = useBidItem();

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

  const handleSubmitForm = async (values: Bid) => {
    onSuccess();
    await mutateAsync({ nftId: item.id, amount: values.amount });
  };

  const isDisabled = Number(userProfile?.totalBalance) < getCurrentPrice(item);

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Box>
        <TextInput
          placeholder={t('type_amount')}
          errors={errors}
          {...register('amount')}
        />
        <BaseButton
          w="100%"
          variant="secondaryLight"
          mt={4}
          type="submit"
          isLoading={isLoading}
          isDisabled={isLoading || isDisabled}
        >
          {t('bid')}
        </BaseButton>
        <Text fontSize="sm" color="gray.400" mt={4}>
          {t('you_bid_on')}
        </Text>
        <Text>{item.name}</Text>
        <Text fontSize="sm" color="gray.400" mt={4}>
          {t('balance')}
        </Text>
        <Text>${formatPrice(userProfile?.totalBalance as number)}</Text>
      </Box>
    </form>
  );
};

export default BalancePayment;
