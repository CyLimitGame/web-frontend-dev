import React from 'react';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';

import _ from 'lodash';

import { Logo } from '../SetDefaultTeam';

import ShirtType1 from '@/icons/shirts/ShirtType1';
import ShirtType2 from '@/icons/shirts/ShirtType2';
import ShirtType3 from '@/icons/shirts/ShirtType3';
import { Jersey, Sponsor } from '@/typings/user.enum';

type Props = {
  jersey?: Jersey;
  primaryColor?: string;
  secondaryColor?: string;
  sponsor?: Sponsor;
};

const JerseyComplete = ({
  jersey,
  sponsor,
  primaryColor,
  secondaryColor,
}: Props) => {
  const renderJersey = () => {
    switch (jersey) {
      case Jersey.DEFAULT1:
        return (
          <ShirtType1
            fontSize="320px"
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        );
      case Jersey.DEFAULT2:
        return (
          <ShirtType2
            fontSize="320px"
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        );
      default:
        return (
          <ShirtType3
            fontSize="320px"
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        );
    }
  };

  return (
    <Box>
      <>{renderJersey()}</>
      <Box
        pos="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
      >
        <Image
          src={_.get(Logo, sponsor as Sponsor)}
          width="140px"
          height="40px"
        />
      </Box>
    </Box>
  );
};

export default JerseyComplete;
