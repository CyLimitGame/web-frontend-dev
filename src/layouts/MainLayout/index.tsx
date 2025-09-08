import React from 'react';
import { Box, Fade, Flex } from '@chakra-ui/react';

import Footer from './Footer';
import Header from './Header';

type Props = {
  children: React.ReactNode;
  isSpacingTop?: boolean;
  isShowFooter?: boolean;
};

const MainLayout = ({
  children,
  isSpacingTop = true,
  isShowFooter = true,
}: Props) => {
  return (
    <Fade in={true}>
      <Flex pt={isSpacingTop ? 16 : 0} flexDirection="column" minH="100vh">
        <Header />
        <Box flex={1}>{children}</Box>
        <Box flexShrink={0}>{isShowFooter && <Footer />}</Box>
      </Flex>
    </Fade>
  );
};

export default MainLayout;
