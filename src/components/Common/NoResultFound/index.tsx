import React from 'react';
import { Flex, Icon } from '@chakra-ui/react';
import { ImFilesEmpty } from 'react-icons/im';

import { Text } from '@/components/Common';

type Props = {
  type: 'primary' | 'secondary' | 'common';
};

const mapMessage = {
  primary: 'no_found_primary',
  secondary: 'no_found_secondary',
  common: 'no_found',
};

const NoResultFound = ({ type }: Props) => {
  return (
    <Flex alignItems="center" flexDirection="column" maxW="280px" margin="auto">
      <Icon
        as={ImFilesEmpty}
        fontSize={['40px', '40px', '70px']}
        color="gray.400"
      />
      <Text
        mt={4}
        color="gray.400"
        textAlign="center"
        fontWeight="bold"
        translateText={mapMessage[type]}
      />
    </Flex>
  );
};

export default NoResultFound;
