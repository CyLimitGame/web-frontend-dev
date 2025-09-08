import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';
import _ from 'lodash';

import { LeagueIcon } from '@/features/core/Common';
import { Text } from '@/components/Common';

type Props = Omit<FlexProps, 'onChange'> & {
  data: any[];
  divisionIds: string[];
  divisionId: string;
  onChange: (id: string) => void;
};

const Leagues = ({
  data,
  divisionId,
  divisionIds,
  onChange,
  ...props
}: Props) => {
  return (
    <Flex fontWeight="bold" textTransform="uppercase" {...props}>
      {_.map(data, (item) => (
        <Flex
          gap={2}
          alignItems="center"
          key={item.id}
          border="1px solid"
          borderColor={item.divisionId === divisionId ? 'white' : 'transparent'}
          p={2}
          borderRadius="md"
          cursor="pointer"
          onClick={() =>
            _.includes(divisionIds, item.divisionId)
              ? undefined
              : onChange(item.divisionId)
          }
          opacity={_.includes(divisionIds, item.divisionId) ? '0.5' : '1'}
        >
          <LeagueIcon name={_.get(item, 'division.name')} />
          <Text>{_.get(item, 'division.name')}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default Leagues;
