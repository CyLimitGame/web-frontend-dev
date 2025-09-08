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
import { TextInput } from '@/components/Inputs';
import { BaseButton } from '@/components/Button';
import { BundleBid, BundleCard } from '@/typings/bundle';
import { useBidBundleItem } from '@/queries/useBundles';

type Props = {
  item: BundleCard;
  onSuccess: () => void;
};

const BalancePayment = ({ item, onSuccess }: Props) => {
  const { data: userProfile } = useGetUserProfile();
  const { t } = useTranslation();
  const { mutateAsync, isLoading } = useBidBundleItem();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BundleBid>({
    resolver: yupResolver(bidSchema(t, item)),
    defaultValues: {
      amount: getCurrentPrice(item),
    },
  });

  const handleSubmitForm = async (values: BundleBid) => {
    await mutateAsync({ bundleId: item.id, amount: values.amount });
    onSuccess();
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
          variant="light"
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
        {item?.nfts?.map((nft) => (
          <Text key={nft.id}>{nft.name}</Text>
        ))}
        <Text fontSize="sm" color="gray.400" mt={4}>
          {t('balance')}
        </Text>
        <Text>${formatPrice(userProfile?.totalBalance as number)}</Text>
      </Box>
    </form>
  );
};

export default BalancePayment;
