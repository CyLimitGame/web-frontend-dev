import { Center } from '@chakra-ui/react';
import React from 'react';

import Text from '../Text';

const Captain = () => {
  return (
    <Center
      pos="absolute"
      top="-6px"
      right="-6px"
      zIndex="docked"
      border="2px solid"
      w="30px"
      h="30px"
      fontWeight="bold"
      borderRadius="2xl"
      borderColor="white"
      bg="background.default"
    >
      <Text color="white">C</Text>
    </Center>
  );
};

export default Captain;
