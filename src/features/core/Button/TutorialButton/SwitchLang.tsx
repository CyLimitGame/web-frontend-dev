import React from 'react';
import { Image, Flex } from '@chakra-ui/react';

import { EN_FLAG, FR_FLAG } from '@/constants/images';

type Props = {
  onChange: (value: string) => void;
};

export const SwitchLang = ({ onChange }: Props) => {
  return (
    <Flex gap={3}>
      <Image
        src={EN_FLAG}
        width="24px"
        height="24px"
        cursor="pointer"
        onClick={() => onChange('en')}
      />
      <Image
        src={FR_FLAG}
        width="24px"
        height="24px"
        cursor="pointer"
        onClick={() => onChange('fr')}
      />
    </Flex>
  );
};

export default SwitchLang;
