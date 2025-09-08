import React from 'react';
import { Flex } from '@chakra-ui/react';

import { Text } from '@/components/Common';
import { RuleItem as RuleItemProps } from '@/typings/rule';
import colors from '@/theme/foundations/colors';

type Props = {
  item: RuleItemProps;
};

const RuleItem = ({ item }: Props) => {
  return (
    <Flex
      p={8}
      border={`1px solid ${colors.gray[200]}`}
      my={3}
      borderRadius="3xl"
      alignItems="center"
      cursor="pointer"
      transition="all .2s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'xs' }}
    >
      <Flex
        width={10}
        height={10}
        mr={4}
        alignItems="center"
        justifyContent="center"
        borderRadius="full"
        bg="primary.500"
        fontWeight="bold"
        color="white"
        shadow="smBlue"
      >
        {item.index}
      </Flex>
      <Text fontSize="lg" fontWeight="bold" color="primary.500">
        {item.title}
      </Text>
    </Flex>
  );
};

export default RuleItem;
