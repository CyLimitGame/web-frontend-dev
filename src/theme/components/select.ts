import type { ComponentStyleConfig } from '@chakra-ui/theme';

const Select: ComponentStyleConfig = {
  baseStyle: {
    field: {
      fontSize: 'sm',
    },
  },
  variants: {
    filled: {
      field: {
        bg: 'blackAlpha.400',
        color: 'white',
        mt: 0,
        fontSize: 'sm',
        rounded: '10px',

        _hover: {
          bg: 'blackAlpha.500',
        },

        _focus: {
          borderColor: 'primary',
        },

        _focusVisible: {
          borderColor: 'primary',
        },
      },
      icon: {
        color: 'white',
      },
    },
  },
};

export default Select;
