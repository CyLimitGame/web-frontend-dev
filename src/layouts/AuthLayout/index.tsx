import React from 'react';

import { Box, BoxProps, Flex } from '@chakra-ui/react';

import { Container, SwitchLang } from '@/components/Common';

type Props = BoxProps & {
  children: React.ReactNode;
};

const AuthLayout = ({ children, ...props }: Props) => {
  return (
    <Box>
      <Flex justifyContent="end" p={2}>
        <SwitchLang />
      </Flex>
      <Container
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        p={2}
        maxW="4xl"
        {...props}
      >
        {children}
      </Container>
    </Box>
  );
};

export default AuthLayout;
