import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';

import { BuyButton, CancelListingButton } from '../core/Button';

import { Text } from '@/components/Common';
import { USDC_ICON } from '@/constants/images';
import { CardItem } from '@/typings/card';
import { useGetUserProfile } from '@/queries/useUser';
import { formatPrice } from '@/utils/number';

type Props = {
  item: CardItem;
};

const BuyInfo = ({ item }: Props) => {
  const { data: user } = useGetUserProfile();

  return (
    <Box px={[2, 2, 6]} py={[3, 3, 6]} bg="gray.100" borderRadius="xl">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <Flex
            width="40px"
            height="40px"
            borderRadius="50%"
            backgroundColor="white"
            justifyContent="center"
            alignItems="center"
            shadow="xl"
            mr={2}
          >
            <Image src={USDC_ICON} width="24px" height="24px" />
          </Flex>
          <Box>
            <Text translateText="current_price" fontSize={['xs', 'sm']} />
            <Text fontSize={['sm', 'xl']} color="primary.500" fontWeight="bold">
              ${formatPrice(item?.fixedPrice)}
            </Text>
          </Box>
        </Flex>
        {user?.id === item?.ownerId ? (
          <CancelListingButton id={item?.id} isDisabled={item?.isLocked} />
        ) : (
          <BuyButton item={item} w="220px" />
        )}
      </Flex>
    </Box>
  );
};

export default BuyInfo;
