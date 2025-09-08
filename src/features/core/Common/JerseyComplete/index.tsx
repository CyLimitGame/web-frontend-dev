import React from 'react';
import { Box } from '@chakra-ui/react';

import ShirtType1 from '@/icons/shirts/ShirtType1';
import ShirtType2 from '@/icons/shirts/ShirtType2';
import ShirtType3 from '@/icons/shirts/ShirtType3';
import { Jersey } from '@/typings/user.enum';
import { Shirt } from '@/typings/user';

type Props = {
  item: Shirt;
  fontSize?: string;
};

const JerseyComplete = ({ item, fontSize = '32px' }: Props) => {
  const { jersey, primaryColor, secondaryColor } = item || {};
  const renderJersey = () => {
    switch (jersey) {
      case Jersey.DEFAULT1:
        return (
          <ShirtType1
            fontSize={fontSize}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        );
      case Jersey.DEFAULT2:
        return (
          <ShirtType2
            fontSize={fontSize}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        );
      default:
        return (
          <ShirtType3
            fontSize={fontSize}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        );
    }
  };

  return (
    <Box pos="relative">
      <>{renderJersey()}</>
    </Box>
  );
};

export default JerseyComplete;
