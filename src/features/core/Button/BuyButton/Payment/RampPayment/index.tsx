import React from 'react';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';

import { Text } from '@/components/Common';
import { CardItem } from '@/typings/card';
import { formatPrice } from '@/utils/number';
import { BaseButton } from '@/components/Button';
import {
  NEXT_PUBLIC_ADMIN_WALLET,
  NEXT_PUBLIC_RAMP_WEBHOOK_URL,
  NEXT_PUBLIC_USDC_DECIMAL,
  RAMP_CONFIG,
} from '@/config/appConfig';
import { useGetUserProfile } from '@/queries/useUser';

type Props = {
  item: CardItem;
  onClose: () => void;
  isLoadingFee: boolean;
};

const RampPayment = ({ item, onClose, isLoadingFee }: Props) => {
  const { t } = useTranslation();
  const { data: userProfile, isLoading } = useGetUserProfile();

  const handleBuy = async () => {
    onClose();
    return new RampInstantSDK({
      ...RAMP_CONFIG,
      swapAmount: `${
        item.rampTotalAmount * 10 ** Number(NEXT_PUBLIC_USDC_DECIMAL)
      }`,
      webhookStatusUrl: `${NEXT_PUBLIC_RAMP_WEBHOOK_URL}?nftId=${item.id}&userId=${userProfile?.id}&action=buy&marketType=fixed`,
      userAddress: NEXT_PUBLIC_ADMIN_WALLET,
    }).show();
  };

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mt={2} textAlign="center">
        $ {formatPrice(item.fixedPrice)}*
      </Text>
      {isLoadingFee || isLoading ? (
        <Flex justifyContent="center" my={3}>
          <Spinner />
        </Flex>
      ) : (
        <React.Fragment>
          <Flex justifyContent="space-between">
            <Text translateText="cylimit_fees" />
            <Text fontWeight="bold">≈ ${item?.fee}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text translateText="estimated_ramp_fees" />
            <Text fontWeight="bold">≈ ${item?.rampFee}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text translateText="total_paid" fontWeight="bold" />
            <Text fontWeight="bold">≈ ${item?.rampTotalAmount}</Text>
          </Flex>
        </React.Fragment>
      )}
      <BaseButton
        isDisabled={isLoading}
        w="100%"
        variant="light"
        mt={3}
        onClick={handleBuy}
      >
        {t('buy')}
      </BaseButton>
      <Text fontSize="sm" color="gray.400" mt={4}>
        {t('you_buy_on')}
      </Text>
      <Text>{item.name}</Text>
      <Text fontSize="sm" color="gray.400" mt={4}>
        *{t('payment_note')}
      </Text>
    </Box>
  );
};

export default RampPayment;
