import type { ComponentStyleConfig } from '@chakra-ui/theme';

const Input: ComponentStyleConfig = {
  baseStyle: {
    field: {
      outline: 'none',
      border: 'none',
      fontStyle: 'italic',
    },
  },
  variants: {
    outline: {
      field: {
        border: '1px solid',
        borderColor: 'whiteAlpha.300',
        _hover: {
          borderColor: 'whiteAlpha.400',
        },
        _focus: {
          borderColor: 'whiteAlpha.500',
          boxShadow: 'none',
        },
      },
    },
    primary: {
      field: {
        background: 'rgba(255, 255, 255, 0.16)',
        _placeholder: {
          color: 'gray.400',
        },
      },
    },
  },
  defaultProps: {
    variant: 'primary',
  },
};

export default Input;
