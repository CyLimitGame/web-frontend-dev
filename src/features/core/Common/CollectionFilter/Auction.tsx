import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

import { Text } from '@/components/Common';
import { FILTER_AUCTION_LIST } from '@/constants/filter';
import { FilterType } from '@/typings/card';
import { FilterBy, MarketType } from '@/typings/card.enum';

type Props = BoxProps & {
  marketType: MarketType;
  filterBy: FilterBy;
  onChangeMarket: (marketType: MarketType, filterBy: FilterBy) => void;
};

const Auction = ({ marketType, filterBy, onChangeMarket, ...props }: Props) => {
  const handleFilter = (item: FilterType) => {
    onChangeMarket(item.value, item.filterBy);
  };

  const isAuction = marketType === MarketType.AUCTION;

  return (
    <Box {...props}>
      <Text translateText="auction" fontWeight="bold" fontSize="xl" />
      {FILTER_AUCTION_LIST.map((item, index) => (
        <Text
          key={index}
          cursor="pointer"
          translateText={item.label}
          color={
            isAuction && filterBy === item.filterBy ? 'primary.500' : 'gray.400'
          }
          my={2}
          fontWeight={
            isAuction && filterBy === item.filterBy ? 'bold' : 'normal'
          }
          _hover={{ transform: 'scale(1.02)' }}
          transition="transform .2s"
          id={`${item.value}_${item.filterBy}`}
          onClick={() => handleFilter(item as FilterType)}
        />
      ))}
    </Box>
  );
};

export default Auction;
