import React, { ReactElement } from 'react';
import { Box, BoxProps, Flex, FlexProps } from '@chakra-ui/react';
import _ from 'lodash';

type Props = {
  spacing: string;
  columns: number;
  data: any[];
  renderItem: (record: any, index: number) => ReactElement;
  containerProps?: FlexProps;
  wrapItemProps?: BoxProps;
};

const DataGridWithFlex = ({
  spacing,
  columns,
  renderItem,
  data,
  containerProps,
  wrapItemProps,
}: Props) => {
  return (
    <Flex
      flexWrap="wrap"
      marginLeft={`-${spacing}`}
      marginTop={`-${spacing}`}
      {...containerProps}
    >
      {_.map(data, (item, index) => (
        <Box
          marginLeft={`${spacing}`}
          marginTop={`${spacing}`}
          width={`calc((100%/${columns}) - ${spacing})`}
          key={index}
          {...wrapItemProps}
        >
          {renderItem(item, index)}
        </Box>
      ))}
    </Flex>
  );
};

export default DataGridWithFlex;
