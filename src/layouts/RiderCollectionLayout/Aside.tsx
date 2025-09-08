import React from 'react';
import { Box } from '@chakra-ui/react';

const MARGIN_TOP = 110;

type Props = {
  renderAsideContent?: () => React.ReactNode;
};

const Aside = ({ renderAsideContent }: Props) => {
  return (
    <Box
      height={`calc(100% + ${MARGIN_TOP}px)`}
      shadow="lg"
      borderRadius="xl"
      position="relative"
      top={`-${MARGIN_TOP}px`}
      width="280px"
      backgroundColor="white"
    >
      <Box pt={4} px={6}>
        {renderAsideContent && renderAsideContent()}
      </Box>
    </Box>
  );
};

export default Aside;
