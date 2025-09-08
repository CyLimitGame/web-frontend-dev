import { Box, BoxProps } from '@chakra-ui/react';
import Image from 'next/image';
import _ from 'lodash';

import ShirtType1, { Props as ShirtProps } from '@/icons/shirts/ShirtType1';
import ShirtType2 from '@/icons/shirts/ShirtType2';
import ShirtType3 from '@/icons/shirts/ShirtType3';
import { Jersey, Sponsor } from '@/typings/user.enum';
import { Logo } from '@/features/SetDefaultTeam';

export type Props = ShirtProps & {
  jersey: Jersey;
  sponsor: Sponsor;
  containerProps?: BoxProps;
};

const JerseyWithSponsor = ({
  jersey,
  sponsor,
  containerProps,
  ...rest
}: Props) => {
  let Shirt = ShirtType3;
  switch (jersey) {
    case Jersey.DEFAULT1:
      Shirt = ShirtType1;
      break;
    case Jersey.DEFAULT2:
      Shirt = ShirtType2;
      break;
  }
  return (
    <Box pos="relative" display="inline" {...containerProps}>
      <Shirt {...rest} />
      <Box pos="absolute" w="100%" h="100%" top={0} opacity={0.9}>
        <Box
          pos="relative"
          w="50%"
          h="16%"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
        >
          <Image src={_.get(Logo, sponsor as Sponsor)} layout="fill" />
        </Box>
      </Box>
    </Box>
  );
};

export default JerseyWithSponsor;
