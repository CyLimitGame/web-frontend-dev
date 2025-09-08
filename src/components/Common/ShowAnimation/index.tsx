import React from 'react';
import { BoxProps } from '@chakra-ui/react';

import { MotionBox } from '@/components/Common';

const ShowAnimation = ({ children, ...props }: BoxProps) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export default ShowAnimation;
