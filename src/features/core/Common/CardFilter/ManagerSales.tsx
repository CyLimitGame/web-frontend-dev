import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

import { Text } from '@/components/Common';
import { FILTER_MANAGER_SALES_LIST } from '@/constants/filter';
import { FilterType } from '@/typings/card';
import { FilterBy, MarketType } from '@/typings/card.enum';

type Props = BoxProps & {
  marketType: MarketType;
  filterBy: FilterBy;
  onChangeMarket: (marketType: MarketType, filterBy: FilterBy) => void;
};

const ManagerSales = ({
  marketType,
  filterBy,
  onChangeMarket,
  ...props
}: Props) => {
  const handleFilter = (item: FilterType) => {
    onChangeMarket(item.value, item.filterBy);
  };

  const isFixed = marketType === MarketType.FIXED;

  return (
    <Box {...props}>
      <Text translateText="manager_sales" fontWeight="bold" fontSize="xl" />
      {FILTER_MANAGER_SALES_LIST.map((item, index) => (
        <Text
          key={index}
          id={`${item.value}_${item.filterBy}`}
          cursor="pointer"
          translateText={item.label}
          _hover={{ transform: 'scale(1.02)' }}
          transition="transform .2s"
          color={
            isFixed && filterBy === item.filterBy ? 'primary.500' : 'gray.400'
          }
          my={2}
          fontWeight={isFixed && filterBy === item.filterBy ? 'bold' : 'normal'}
          onClick={() => handleFilter(item as FilterType)}
        />
      ))}
    </Box>
  );
};

export default ManagerSales;
