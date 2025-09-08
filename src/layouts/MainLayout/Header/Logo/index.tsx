import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';

import { CYLIMIT_LOGO } from '@/constants/images';
import { PATH } from '@/constants/path';

const Logo = (props: BoxProps) => {
  return (
    <NextLink href={PATH.HOME} passHref>
      <Box
        cursor="pointer"
        display="inline-block"
        pos="relative"
        w="140px"
        height="40px"
        as="a"
        {...props}
      >
        <Image src={CYLIMIT_LOGO} layout="fill" />
      </Box>
    </NextLink>
  );
};

export default Logo;
