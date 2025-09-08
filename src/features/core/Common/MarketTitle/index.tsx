import React from 'react';

import { Text } from '@/components/Common';

type Props = {
  text: string;
  color?: string;
};

const MarketTitle = ({ text, color = 'gray.900' }: Props) => {
  return (
    <Text
      fontWeight="bold"
      fontSize={['xl', '2xl', '4xl']}
      translateText={text}
      color={color}
    />
  );
};

export default MarketTitle;
