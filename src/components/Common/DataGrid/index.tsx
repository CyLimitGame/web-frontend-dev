import React from 'react';
import { Flex, Box, SimpleGrid, SimpleGridProps } from '@chakra-ui/react';
import _ from 'lodash';

import Loader from '../Loader';
import { NoResultFound } from '..';

type Props = SimpleGridProps & {
  renderItem: (record: any, index: number) => React.ReactNode;
  notFoundItems?: React.ReactElement;
  data: any[];
  prefix?: string;
  isLoading?: boolean;
  type?: 'primary' | 'secondary' | 'common';
  isShowNotFound?: boolean;
  numberOfSkeleton?: number;
  renderSkeleton?: () => React.ReactNode;
};

const DataGrid = ({
  renderItem,
  data,
  prefix,
  isLoading,
  notFoundItems,
  type = 'common',
  isShowNotFound = true,
  numberOfSkeleton,
  renderSkeleton,
  ...props
}: Props) => {
  const isEmpty = _.isEmpty(data);

  if (isLoading && numberOfSkeleton && renderSkeleton) {
    return (
      <SimpleGrid {...props}>
        {_.map(Array.from(Array(numberOfSkeleton).keys()), (_key, index) => (
          <Box key={index}>{renderSkeleton()}</Box>
        ))}
      </SimpleGrid>
    );
  }

  if (isLoading) {
    return (
      <Flex justifyContent="center" my={10}>
        <Loader size="xl" />
      </Flex>
    );
  }

  if (!isLoading && isEmpty && isShowNotFound) {
    return (
      notFoundItems || (
        <Box>
          <NoResultFound type={type} />
        </Box>
      )
    );
  }

  return (
    <SimpleGrid {...props}>
      {_.map(data, (record, index) => (
        <Box key={`${prefix}-${record.id || index}`}>
          {renderItem(record, index)}
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default DataGrid;
