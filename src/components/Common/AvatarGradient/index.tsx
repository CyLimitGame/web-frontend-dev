import React from 'react';
import { BoxProps, Flex } from '@chakra-ui/react';
import Image, { ImageProps } from 'next/image';

type Props = ImageProps & {
  boxProps?: BoxProps;
  padding?: BoxProps['padding'];
};

const AvatarGradient = ({ boxProps, padding, ...props }: Props) => {
  return (
    <Flex
      borderRadius="50%"
      bgGradient={['linear(to-t, secondary.500, primary.500)']}
      display="inline-flex"
      {...boxProps}
    >
      <Flex p={padding} backgroundColor="white" borderRadius="50%">
        <Image {...props} style={{ borderRadius: '50%' }} />
      </Flex>
    </Flex>
  );
};

export default AvatarGradient;
