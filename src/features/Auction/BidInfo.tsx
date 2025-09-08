import React, { useCallback, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';

import Image from 'next/image';

import { PlaceABidButton } from '@/features/core/Button';
import { Text, CountdownTime } from '@/components/Common';
import { AlertClockIcon } from '@/icons';
import { AuctionCard } from '@/typings/auction';
import { formatDateTime } from '@/utils/date';
import { USDC_ICON } from '@/constants/images';
import { getPrice } from '@/utils/card';
// import { useGetUserProfile } from '@/queries/useUser';

type Props = {
  item: AuctionCard;
};

const BidInfo = ({ item }: Props) => {
  // const { data } = useGetUserProfile();

  // const firstHistory = _.get(
  //   _.orderBy(item?.auctionBids, ['amount'], ['desc']),
  //   '[0]',
  //   { bidder: {} }
  // );

  // const disabled = data?.id === firstHistory?.bidder?.id;

  const [isDisableBid, setIsDisableBid] = useState(false);

  const handleCompleteTime = useCallback(() => {
    setIsDisableBid(true);
    const now = dayjs();
    const time = dayjs(item?.auctionEndDate);
    const secondsDiff = now.diff(time, 'second');
    if (secondsDiff < 1) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [item?.auctionEndDate]);

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
              <Image src={USDC_ICON} width="24px" height="24px" />
            </Flex>
            <Box ml={4}>
              <Text translateText="current_price" fontSize={['xs', 'sm']} />
              <Text
                fontSize={['sm', 'xl']}
                fontWeight="bold"
                color="primary.500"
              >
                ${getPrice(item)}
              </Text>
            </Box>
          </Flex>
        </Box>
        <PlaceABidButton item={item} isDisabled={isDisableBid} />
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
                  onComplete={handleCompleteTime}
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
