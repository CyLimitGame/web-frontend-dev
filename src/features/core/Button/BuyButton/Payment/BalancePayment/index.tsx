import React from 'react';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { Text } from '@/components/Common';
import { CardItem } from '@/typings/card';
import { formatPrice } from '@/utils/number';
import { useGetUserProfile } from '@/queries/useUser';
import { BaseButton } from '@/components/Button';
import { useBuyNft } from '@/queries/useSecondaryMarket';

type Props = {
  item: CardItem;
  onSuccess: () => void;
  isLoadingFee: boolean;
};

const BalancePayment = ({ item, onSuccess, isLoadingFee }: Props) => {
  const { data: userProfile } = useGetUserProfile();
  const { t } = useTranslation();
  const { mutateAsync, isLoading } = useBuyNft();

  const handleBuy = async () => {
    await mutateAsync(item.id);
    onSuccess();
  };

  const isDisabled = Number(userProfile?.totalBalance) < item.fixedPrice;

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mt={2} textAlign="center">
        $ {formatPrice(item.fixedPrice)}
      </Text>
      {isLoadingFee ? (
        <Flex justifyContent="center" my={3}>
          <Spinner />
        </Flex>
      ) : (
        <React.Fragment>
          <Flex justifyContent="space-between">
            <Text translateText="fee" />
            <Text fontWeight="bold">≈ ${item?.fee}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text translateText="total_paid" fontWeight="bold" />
            <Text fontWeight="bold">≈ ${item?.totalAmount}</Text>
          </Flex>
        </React.Fragment>
      )}
      <BaseButton
        w="100%"
        variant="secondaryLight"
        mt={3}
        onClick={handleBuy}
        isLoading={isLoading}
        isDisabled={isLoading || isDisabled}
      >
        {t('buy')}
      </BaseButton>
      <Text fontSize="sm" color="gray.400" mt={4}>
        {t('you_buy_on')}
      </Text>
      <Text>{item.name}</Text>
      <Text fontSize="sm" color="gray.400" mt={4}>
        {t('balance')}
      </Text>
      <Text>${formatPrice(userProfile?.totalBalance as number)}</Text>
    </Box>
  );
};

export default BalancePayment;
