import React from 'react';
import { BoxProps } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import ShowAnimation from '../ShowAnimation';

type Props = BoxProps & {
  label: string;
};

const Ribon = ({ label, ...props }: Props) => {
  const { t } = useTranslation();
  return (
    <ShowAnimation
      pos="absolute"
      right="-24px"
      top="18px"
      width="120px"
      transform="rotate(42deg)"
      textAlign="center"
      color="white"
      fontSize="xs"
      fontWeight="bold"
      background="primary.500"
      zIndex="docked"
      shadow="smBlue"
      py={1}
      {...props}
    >
      {t(label)}
    </ShowAnimation>
  );
};

export default Ribon;
