import { IconButton } from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode';
import React from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

const ModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton aria-label="" onClick={toggleColorMode}>
      {colorMode === 'dark' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
    </IconButton>
  );
};

export default ModeButton;
