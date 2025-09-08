import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import _ from 'lodash';

import { PlaceABidButton } from '@/features/core/Button';
import { AuctionCard as AuctionCardProps } from '@/typings/auction';
import { CardAnimation, CountdownTime, TextOneLine } from '@/components/Common';
import { navigateToCard } from '@/utils/navigation';
import CardImageLoader from '@/components/Common/CardImageLoader';

type Props = {
  item: AuctionCardProps;
};

const AuctionCard = ({ item }: Props) => {
  const [isDisableBid, setIsDisableBid] = useState(false);

  const price = _.get(item, 'auctionBestBid.amount', item?.auctionStartPrice);

  const handleToggleItem = () => {
    navigateToCard(item.id);
  };

  return (
    <CardAnimation>
      <Box
        bg="gray.100"
        p={3}
        borderRadius="xl"
        transition="all .2s"
        cursor="pointer"
        onClick={handleToggleItem}
      >
        <CardImageLoader src={item.imageUrl} />
        <Text
          textAlign="center"
          fontSize="sm"
          fontWeight="bold"
          color="primary.500"
          mt={4}
        >
          ${price}
        </Text>
        <Text
          fontSize="xs"
          fontWeight="bold"
          color="error.500"
          textAlign="center"
        >
          <CountdownTime
            date={item?.auctionEndDate}
            onComplete={() => setIsDisableBid(true)}
            onRetryEnable={() => setIsDisableBid(false)}
          />
        </Text>
        <TextOneLine
          textAlign="center"
          fontSize="lg"
          fontWeight="bold"
          color="gray.900"
          maxW="200px"
          margin="auto"
          mt={4}
          value={item?.name}
        />
        <Box textAlign="center" pt={4}>
          <PlaceABidButton width="100%" item={item} isDisabled={isDisableBid} />
        </Box>
      </Box>
    </CardAnimation>
  );
};

export default AuctionCard;
