import React, { useState } from 'react';
import { Box, BoxProps, Text } from '@chakra-ui/react';
import _ from 'lodash';
import Link from 'next/link';

import { Favorite } from '@/features/core/Common';
import { PlaceABidButton } from '@/features/core/Button';
import { AuctionCard as AuctionCardProps } from '@/typings/auction';
import { AvgCapScoreAndBonus, CountdownTime } from '@/components/Common';
import CardImageLoader from '@/components/Common/CardImageLoader';
import { formatPrice } from '@/utils/number';
import { getTemplatePath } from '@/utils/string';
import { PATH } from '@/constants/path';

type Props = BoxProps & {
  item: AuctionCardProps;
  isShowAction?: boolean;
};

const AuctionCard = ({ item, isShowAction = true, ...props }: Props) => {
  const [isDisableBid, setIsDisableBid] = useState(false);

  const price = _.get(item, 'auctionBestBid.amount', item?.auctionStartPrice);

  return (
    <Box
      bg="cardOverlay"
      p={[2, 2, 3]}
      borderRadius={['2xl', '2xl', '3xl']}
      transition="all .2s"
      {...props}
    >
      <Link href={getTemplatePath(PATH.CARD_DETAILS, { id: item.id })} passHref>
        <Box as="a" cursor="pointer">
          <CardImageLoader src={item.imageUrl} />
        </Box>
      </Link>
      {item.capScore && (
        <Box mt={2}>
          <AvgCapScoreAndBonus item={item} />
        </Box>
      )}
      <Box pos="relative">
        <Text
          textAlign="center"
          fontSize="lg"
          fontWeight="bold"
          color="error.400"
          mt={2}
        >
          ${formatPrice(price)}
        </Text>
        <Box pos="absolute" top={0} right={0}>
          <Favorite riderId={item.riderId} />
        </Box>
      </Box>
      <Text fontSize="xs" color="error.400" textAlign="center">
        <CountdownTime
          date={item?.auctionEndDate}
          onComplete={() => setIsDisableBid(true)}
          onRetryEnable={() => setIsDisableBid(false)}
        />
      </Text>
      {isShowAction && (
        <Box textAlign="center" pt={[2, 2, 4]}>
          <PlaceABidButton width="100%" item={item} isDisabled={isDisableBid} />
        </Box>
      )}
    </Box>
  );
};

export default AuctionCard;
