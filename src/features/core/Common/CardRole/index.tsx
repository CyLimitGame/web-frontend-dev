import React from 'react';
import _ from 'lodash';

import { TextProps } from '@chakra-ui/react';

import { Text } from '@/components/Common';

type Props = TextProps & {
  role: string;
  roles: { role: string }[];
};

const CardRole = ({ role, roles, ...rest }: Props) => {
  const uniqueRoles = _.uniqBy(roles, 'role');
  const isHide = uniqueRoles.length === 1;

  if (isHide) {
    return null;
  }

  return (
    <Text
      translateText={role}
      fontSize={['xs', 'sm']}
      fontWeight="bold"
      mb={2}
      textAlign="center"
      {...rest}
    />
  );
};

export default CardRole;
