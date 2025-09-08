import { Box, Center, Icon } from '@chakra-ui/react';
import _ from 'lodash';
import Image from 'next/image';
import React from 'react';
import { MdStar } from 'react-icons/md';

import { getRarityImage } from '@/utils/string';

type Props = {
  rarity: string;
  star: number;
};

const RarityWithStar = ({ rarity, star }: Props) => {
  return (
    <Box
      key={rarity}
      pos="relative"
      w="28px"
      h="42px"
      borderRadius="sm"
      overflow="hidden"
    >
      <Image src={getRarityImage(rarity)} layout="fill" />
      <Center pos="absolute" w="100%" h="100%" flexWrap="wrap">
        {_.map(Array.from(Array(star).keys()), (_key, index) => (
          <Icon as={MdStar} fontSize="xs" key={index} />
        ))}
      </Center>
    </Box>
  );
};

export default RarityWithStar;
