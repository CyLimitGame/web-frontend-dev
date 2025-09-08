import { Box, Center, CenterProps, Spinner } from '@chakra-ui/react';
import React from 'react';

type Props = CenterProps & {
  children: React.ReactNode;
  isLoading: boolean;
};

const LoaderOverlay = ({ children, isLoading, ...props }: Props) => {
  return (
    <Box pos="relative">
      {isLoading && (
        <Center
          pos="absolute"
          w="100%"
          h="100%"
          bg="gray.500"
          zIndex="banner"
          opacity="0.6"
          {...props}
        >
          <Spinner size="lg" />
        </Center>
      )}
      <>{children}</>
    </Box>
  );
};

export default LoaderOverlay;
