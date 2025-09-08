import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import Left from './Left';
import Center from './Center';
import Right from './Right';

import { Container } from '@/components/Common';
import useScrollY from '@/hooks/useScrollY';

const Header = () => {
  const { isScrollTop } = useScrollY();

  return (
    <Box
      position="fixed"
      left={0}
      right={0}
      top={0}
      zIndex="sticky"
      bg="background.default"
      transition="all .3s"
      shadow={!isScrollTop ? 'lg' : 'none'}
      borderBottom="1px solid"
      borderColor="border"
    >
      <Container>
        <Flex height="60px" alignItems="center">
          <Left />
          <Center />
          <Right />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
