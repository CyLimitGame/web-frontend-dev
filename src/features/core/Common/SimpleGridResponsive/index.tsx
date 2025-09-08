import React from 'react';
import _ from 'lodash';
import { SimpleGrid, useBreakpointValue } from '@chakra-ui/react';

type Props = {
  data: any[];
  renderItem: (item: any) => React.ReactElement;
};

const SimpleGridResponsive = ({ data, renderItem }: Props) => {
  const columnCount = useBreakpointValue({ base: 2, sm: 2, md: 3, xl: 4 });
  return (
    <SimpleGrid columns={columnCount} spacing={[2, 2, 4]}>
      {_.map(_.take(data, columnCount), (item, index) => (
        <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
      ))}
    </SimpleGrid>
  );
};

export default SimpleGridResponsive;
