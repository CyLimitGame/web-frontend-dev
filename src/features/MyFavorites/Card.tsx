import React from 'react';
import { Box, BoxProps, Flex } from '@chakra-ui/react';
import _ from 'lodash';

import { CardItem as CardItemProps } from '@/typings/card';
import { CardAnimation, TextOneLine } from '@/components/Common';
import CardImageLoader from '@/components/Common/CardImageLoader';
import { Favorite } from '@/features/core/Common';
import { navigateToCard } from '@/utils/navigation';
import { MarketType } from '@/typings/card.enum';
import { NO_CARD } from '@/constants/images';

type Props = BoxProps & {
  item: CardItemProps;
};

const Card = ({ item, ...props }: Props) => {
  const handleToggleItem = () => {
    if (
      item.marketType === MarketType.FIXED ||
      item.marketType === MarketType.AUCTION
    ) {
      return navigateToCard(item.id);
    }
  };

  return (
    <CardAnimation>
      <Box
        bg="gray.100"
        p={[2, 3, 3]}
        borderRadius="xl"
        transition="all .2s"
        cursor="pointer"
        onClick={handleToggleItem}
        {...props}
      >
        <CardImageLoader src={_.get(item, 'freeCard.imageUrl', NO_CARD)} />
        <Flex my={2} justifyContent="center">
          <Favorite riderId={item.id} />
        </Flex>
        <TextOneLine
          textAlign="center"
          fontSize="lg"
          fontWeight="bold"
          color="gray.900"
          maxW="200px"
          margin="auto"
          value={item?.name}
        />
      </Box>
    </CardAnimation>
  );
};

export default Card;
