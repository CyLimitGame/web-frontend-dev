import React from 'react';
import { Flex } from '@chakra-ui/react';

import { CylimitLogo, Text } from '@/components/Common';

type Props = {
  nickName: string;
};

const ViewCheckEmail = ({ nickName }: Props) => {
  return (
    <Flex direction="column" alignItems="center">
      <Flex gap={2} alignItems="center">
        <Text fontSize="3xl" fontWeight="bold">
          WELCOME IN
        </Text>
        <CylimitLogo />
      </Flex>
      <Text textTransform="uppercase" fontSize="2xl" fontWeight="bold" my={4}>
        {nickName} Team
      </Text>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        textTransform="uppercase"
        color="gray.400"
      >
        To continue, please confirm your email
      </Text>
    </Flex>
  );
};

export default ViewCheckEmail;
