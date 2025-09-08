import { Center, CenterProps } from '@chakra-ui/react';
import React from 'react';

const Circle = (props: CenterProps) => {
  return (
    <Center
      boxSize="26px"
      borderRadius="4xl"
      border="1px solid white"
      fontSize="xs"
      fontWeight="bold"
      {...props}
    />
  );
};

export default Circle;
