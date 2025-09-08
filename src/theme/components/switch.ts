import type { ComponentStyleConfig } from '@chakra-ui/theme';

const Switch: ComponentStyleConfig = {
  baseStyle: {
    track: {
      _checked: {
        bg: 'error.400',
      },
    },
  },
};

export default Switch;
