import React from 'react';
import NextImage from 'next/image';
import { Box, BoxProps } from '@chakra-ui/react';

import { SKELETON } from '@/constants/images';

type Props = BoxProps & {
  src: string;
  aspectRatio?: string;
  unoptimized?: boolean;
};

const CardImageLoader = ({
  src,
  aspectRatio = '0.65',
  unoptimized,
  ...props
}: Props) => {
  return (
    <Box
      sx={{
        aspectRatio,
        position: 'relative',
      }}
      overflow="hidden"
      {...props}
    >
      <Box w="100%" height="100%">
        <NextImage
          src={src}
          layout="fill"
          unoptimized={unoptimized}
          placeholder="blur"
          blurDataURL={SKELETON}
        />
      </Box>
    </Box>
  );
};

export default CardImageLoader;
