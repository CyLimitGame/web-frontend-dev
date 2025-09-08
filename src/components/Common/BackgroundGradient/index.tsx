import React from 'react';
import { Box } from '@chakra-ui/layout';

type Props = {
  children: React.ReactNode;
};

const BackgroundGradient = ({ children }: Props) => {
  return (
    <Box position="relative">
      <Box
        position="absolute"
        width={560}
        height={560}
        left={200}
        top={-198}
        background="conic-gradient(from 180deg at 50% 50%, #FEB80A 0deg, #3A79E5 189.38deg, #22C55E 360deg);"
        filter="blur(200px)"
        sx={{ msFilter: 'blur(200px)', WebkitFilter: 'blur(200px)' }}
        opacity={0.5}
        transform="rotate(45deg)"
        zIndex={-1}
        display={['none', 'none', 'none', 'block']}
      />
      <Box minHeight="100vh">{children}</Box>
    </Box>
  );
};

export default BackgroundGradient;
