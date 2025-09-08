import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import _ from 'lodash';

import { Status } from './Status';
import Actions from './Actions';

import { navigateToCard } from '@/utils/navigation';
import { MyCardItem } from '@/typings/card';
import { MarketType } from '@/typings/card.enum';
import {
  AvgCapScoreAndBonus,
  Countdown,
  ShowAnimation,
  Text,
  TextOneLine,
} from '@/components/Common';
import { checkExpiredTime } from '@/utils/date';
import CardImageLoader from '@/components/Common/CardImageLoader';
import { GRAY_CARD, NO_CARD } from '@/constants/images';

type Props = {
  item: MyCardItem;
};

const OwnerCard = ({ item }: Props) => {
  const isPointer = !['na', 'white'].includes(item.rarity);

  const handleToggleItem = () => {
    if (!isPointer) {
      return;
    }
    return navigateToCard(item.id);
  };

  const time = new Date(item.fixedEndDate).getTime() - Date.now();
  const isExpiredTime = checkExpiredTime(item.fixedEndDate);

  return (
    <ShowAnimation>
      <Box
        bg="gray.100"
        p={[2, 2, 3]}
        borderRadius="xl"
        transition="all .2s"
        w="100%"
        cursor={isPointer ? 'pointer' : 'default'}
      >
        <CardImageLoader
          src={_.get(
            item,
            'imageUrl',
            item.rarity === 'white' ? GRAY_CARD : NO_CARD
          )}
          onClick={handleToggleItem}
        />
        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <TextOneLine
            fontSize="lg"
            fontWeight="bold"
            color="gray.900"
            maxW="200px"
            value={item?.name}
          />
          <Box pos="relative">
            <Actions item={item} />
          </Box>
        </Flex>
        <AvgCapScoreAndBonus item={item} />
        <Text fontSize="xs" height="20px" color="error.500">
          {item.marketType === MarketType.FIXED && !isExpiredTime && (
            <Countdown date={Date.now() + time} key={time} />
          )}
        </Text>
        <Box height="30px" mt={1}>
          <Status item={item} />
        </Box>
        <Box height="30px">
          {item.marketType === MarketType.FIXED && (
            <Text fontSize="lg" fontWeight="bold" color="primary.500">
              ${item?.fixedPrice}
            </Text>
          )}
        </Box>
      </Box>
    </ShowAnimation>
  );
};

export default OwnerCard;
