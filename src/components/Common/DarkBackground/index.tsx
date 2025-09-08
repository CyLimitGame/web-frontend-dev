import React from 'react';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';

import { DISCOVER_MORE } from '@/constants/images';

type Props = {
  children: React.ReactNode;
};

const DarkBackground = ({ children }: Props) => {
  return (
    <Box bg="#101827" position="relative" pb={5}>
      <Box
        position="absolute"
        w="140px"
        h="140px"
        top="0"
        left="50%"
        transform="translate(-50%, -70%)"
        border="20px solid white"
        borderRadius="100px"
        display={['none', 'none', 'none', 'block']}
      >
        <Box
          w="100%"
          h="100%"
          borderRadius="100px"
          position="relative"
          bgColor="#f8fcfb"
          _before={{
            content: `''`,
            position: 'absolute',
            w: '52px',
            h: '40px',
            bg: 'transparent',
            borderTopRightRadius: '34px',
            boxShadow: '0px -16px 0 -6px white',
            left: '-52px',
            top: '78px',
          }}
          _after={{
            content: `''`,
            position: 'absolute',
            w: '52px',
            h: '40px',
            bg: 'transparent',
            borderTopLeftRadius: '34px',
            boxShadow: '0px -16px 0 -6px #f8fcfb',
            right: '-52px',
            top: '78px',
          }}
        >
          <Image src={DISCOVER_MORE} width="140px" height="140px" />
        </Box>
      </Box>
      <Box
        w="100%"
        maxW="1440px"
        h="100%"
        mx="auto"
        position="absolute"
        top={0}
        left="50%"
        transform="translatex(-50%)"
        display={['none', 'none', 'none', 'block']}
      >
        <Box
          position="absolute"
          h="50%"
          bg="#ff98001c"
          left="10%"
          right="30%"
          filter="blur(100px)"
        />
        <Box
          position="absolute"
          h="50%"
          bg="#2196f33d"
          left="40%"
          right="10%"
          filter="blur(200px)"
        />
        <Box
          position="absolute"
          h="50%"
          bg="#00800029"
          left="30%"
          right="30%"
          top="38%"
          filter="blur(100px)"
        />
      </Box>
      <Box position="relative" zIndex="docked" minH="500px">
        {children}
      </Box>
    </Box>
  );
};

export default DarkBackground;
