import type { ComponentStyleConfig } from '@chakra-ui/theme';

const Checkbox: ComponentStyleConfig = {
  baseStyle: {
    control: {
      _focus: {
        boxShadow: 'none',
      },
      _checked: {
        bg: 'error.500 !important',
        borderColor: 'error.500 !important',
        color: 'white',
      },
    },
  },
};

export default Checkbox;
