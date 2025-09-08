import { Box, Center, Flex } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import _ from 'lodash';

import { useCountByRarity } from '@/queries/useCard';
import { getRarityImage } from '@/utils/string';
import { Text } from '@/components/Common';

type Props = {
  userId?: string;
};

const CountCardByRarity = ({ userId }: Props) => {
  const { data } = useCountByRarity(userId);

  return (
    <Flex gap={2}>
      {_.map(data, (value, key) => (
        <Box
          pos="relative"
          w="40px"
          sx={{ aspectRatio: '0.7' }}
          borderRadius="md"
          overflow="hidden"
        >
          <Image key={key} src={getRarityImage(key)} layout="fill" />
          <Center pos="absolute" w="100%" h="100%">
            <Text fontWeight="bold">{value}</Text>
          </Center>
        </Box>
      ))}
    </Flex>
  );
};

export default CountCardByRarity;
