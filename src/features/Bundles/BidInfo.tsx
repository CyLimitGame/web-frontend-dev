import React, { useState } from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';

import { PlaceABidBundleButton } from '@/features/core/Button';
import { Text, CountdownTime } from '@/components/Common';
import { AlertClockIcon } from '@/icons';
import { formatDateTime } from '@/utils/date';
import { USDC_ICON } from '@/constants/images';
import { BundleCard } from '@/typings/bundle';
import { getPrice } from '@/utils/card';

type Props = {
  item: BundleCard;
};

const BidInfo = ({ item }: Props) => {
  const [isDisableBid, setIsDisableBid] = useState(false);

  return (
    <React.Fragment>
      <Flex
        px={[2, 2, 6]}
        py={[3, 3, 6]}
        alignItems="center"
        backgroundColor="gray.100"
        borderRadius="xl"
        justifyContent="space-between"
      >
        <Box>
          <Flex alignItems="center">
            <Flex
              width="40px"
              height="40px"
              borderRadius="50%"
              backgroundColor="white"
              justifyContent="center"
              alignItems="center"
              shadow="xl"
            >
              <Image src={USDC_ICON} w="24px" h="24px" />
            </Flex>
            <Box ml={4}>
              <Text translateText="current_price" fontSize="sm" />
              <Text fontSize="xl" fontWeight="bold" color="primary.500">
                ${getPrice(item)}
              </Text>
            </Box>
          </Flex>
        </Box>
        <PlaceABidBundleButton item={item} isDisabled={isDisableBid} />
      </Flex>

      <Flex
        mt={[2, 2, 6]}
        px={[2, 2, 6]}
        py={[3, 3, 6]}
        alignItems="center"
        backgroundColor="gray.100"
        borderRadius="xl"
        justifyContent="space-between"
      >
        <Box>
          <Flex alignItems="center" gap={[2, 2, 4]}>
            <Flex
              width="40px"
              height="40px"
              borderRadius="50%"
              backgroundColor="white"
              justifyContent="center"
              alignItems="center"
              shadow="xl"
            >
              <AlertClockIcon />
            </Flex>
            <Box>
              <Text translateText="remaining_time" fontSize={['xs', 'sm']} />
              <Text
                fontSize={['sm', 'md', 'xl']}
                fontWeight="bold"
                color="error.500"
              >
                <CountdownTime
                  date={item?.auctionEndDate}
                  onComplete={() => setIsDisableBid(true)}
                  onRetryEnable={() => setIsDisableBid(false)}
                />
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box textAlign="right">
          <Text translateText="expiration_date" fontSize={['xs', 'sm']} />
          <Text
            fontSize={['sm', 'md', 'xl']}
            fontWeight="bold"
            color="gray.900"
          >
            {formatDateTime(item?.auctionEndDate)}
          </Text>
        </Box>
      </Flex>
    </React.Fragment>
  );
};

export default BidInfo;
