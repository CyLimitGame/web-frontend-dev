import React from 'react';
import { Box } from '@chakra-ui/react';

import Logo from '../Logo';
import MenuDrawer from '../MenuDrawer';

const Left = () => {
  return (
    <Box>
      <Box display={{ base: 'block', md: 'block', lg: 'none' }}>
        <MenuDrawer />
      </Box>
      <Box display={{ base: 'none', md: 'none', lg: 'block' }}>
        <Logo />
      </Box>
    </Box>
  );
};

export default Left;
