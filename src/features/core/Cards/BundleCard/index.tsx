import React, { useState } from 'react';
import { Box, Flex, FlexProps, Text } from '@chakra-ui/react';
import _ from 'lodash';

import { PlaceABidBundleButton } from '@/features/core/Button';
import { navigateToBundleDetail } from '@/utils/navigation';
import { BundleCard as BundleCardProps } from '@/typings/bundle';
import spacing from '@/theme/foundations/space';
import { formatPrice } from '@/utils/number';
import { CardAnimation, CountdownTime, TextOneLine } from '@/components/Common';
import CardImageLoader from '@/components/Common/CardImageLoader';

const SPACING = spacing[3];
const COLUMN = 3;

type Props = FlexProps & {
  item: BundleCardProps;
};

const BundleCard = ({ item, ...props }: Props) => {
  const [isDisableBid, setIsDisableBid] = useState(false);

  const handleToggleItem = () => {
    navigateToBundleDetail(item.id);
  };

  const price = item
    ? formatPrice(item.auctionBestBid?.amount || item.auctionStartPrice)
    : 0;

  const row1 = _.slice(item?.nfts, 0, 3);
  const row2 = _.slice(item?.nfts, 3, 6);

  const _renderRow = (data: any) => (
    <Flex
      flexWrap="wrap"
      marginLeft={`-${SPACING}`}
      marginTop={`-${SPACING}`}
      justifyContent="center"
      mb={3}
    >
      {data.map((card: any) => (
        <Box
          key={`bundle-${card.id}`}
          width={`calc(100% / ${COLUMN} - ${SPACING})`}
          marginLeft={SPACING}
          marginTop={SPACING}
          borderRadius="xl"
          overflow="hidden"
        >
          {card?.imageUrl ? (
            <CardImageLoader src={card?.imageUrl} />
          ) : (
            <Box sx={{ aspectRatio: '0.65' }} />
          )}
        </Box>
      ))}
    </Flex>
  );
  return (
    <CardAnimation>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        bg="gray.100"
        p={[2, 2, 3]}
        borderRadius={12}
        height="100%"
        w="100%"
        transition="all .2s"
        cursor="pointer"
        onClick={handleToggleItem}
        {...props}
      >
        <Box>
          {_renderRow(row1.length ? row1 : [{ id: '1' }])}
          {_renderRow(row2.length ? row2 : [{ id: '2' }])}
        </Box>
        <Box>
          <Text
            textAlign="center"
            fontSize="sm"
            fontWeight="bold"
            color="primary.500"
            mt={2}
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
            mt={[2, 2, 4]}
            value={item?.name}
          />
          <Box textAlign="center" pt={[2, 2, 4]}>
            <PlaceABidBundleButton
              width="100%"
              item={item}
              isDisabled={isDisableBid}
            />
          </Box>
        </Box>
      </Flex>
    </CardAnimation>
  );
};

export default BundleCard;
