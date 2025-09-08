import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { links } from '../constant';
import LinkItem from '../LinkItem';

import { ClaimFreeCardsButton } from '@/features/core/Button';

const Center = () => {
  return (
    <Flex flex={1}>
      <Box display={{ base: 'none', md: 'none', lg: 'block' }} pl={20}>
        {links.map((item, index) => (
          <LinkItem item={item} key={index} />
        ))}
      </Box>
      <ClaimFreeCardsButton
        display={{ base: 'none', md: 'none', lg: 'block' }}
      />
    </Flex>
  );
};

export default Center;
