import React from 'react';
import { Spinner, SpinnerProps } from '@chakra-ui/react';

const Loader = (props: SpinnerProps) => {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="primary.500"
      size="xl"
      {...props}
    />
  );
};

export default Loader;
