import React from 'react';
import { Center } from '@chakra-ui/react';

import { Text } from '@/components/Common';

const RiderNotFound = () => {
  return (
    <Center p={4} h="100%">
      <Text
        translateText="you_have_no_riders_in_the_startlist"
        fontSize={['sm', 'lg']}
        fontWeight="bold"
        textAlign="center"
        maxW="1000px"
        color="gray.400"
      />
    </Center>
  );
};

export default RiderNotFound;
