import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import _ from 'lodash';

import Loader from '../Loader';

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
  notFoundComponent?: React.ReactElement;
  dataFound?: any;
};

const LoaderContainer = ({
  isLoading,
  children,
  dataFound,
  notFoundComponent,
}: Props) => {
  if (_.isEmpty(dataFound) && notFoundComponent && !isLoading) {
    return notFoundComponent;
  }

  return (
    <Box>
      {isLoading ? (
        <Flex justifyContent="center" py={4}>
          <Loader />
        </Flex>
      ) : (
        children
      )}
    </Box>
  );
};

export default LoaderContainer;
