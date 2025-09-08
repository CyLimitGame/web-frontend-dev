import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

import breakpoints from '@/theme/foundations/breakpoints';

type Props = BoxProps & {
  children: React.ReactNode;
};

const Container = ({ children, ...props }: Props) => {
  return (
    <Box maxWidth={breakpoints['2xl']} px={[2, 2, 4]} margin="auto" {...props}>
      {children}
    </Box>
  );
};

export default Container;
