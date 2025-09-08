import { Flex, Switch } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';

import { FilterContext } from '.';

import { Text } from '@/components/Common';

const ForSale = () => {
  const { control } = useContext(FilterContext);
  return (
    <Flex
      borderRadius="md"
      border="1px solid"
      borderColor="border"
      overflow="hidden"
      justifyContent="space-between"
      p={3}
    >
      <Text translateText="for_sale" textTransform="uppercase" />
      <Controller
        name="isSale"
        control={control}
        render={({ field }) => <Switch {...field} isChecked={field.value} />}
      />
    </Flex>
  );
};

export default ForSale;
