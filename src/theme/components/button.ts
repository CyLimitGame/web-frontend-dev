import type { ComponentStyleConfig } from '@chakra-ui/theme';

// import { hexToRgba } from '@/utils/color';
// import colors from '@/theme/foundations/colors';

const Button: ComponentStyleConfig = {
  baseStyle: {
    minW: '100px',
    borderRadius: '12px',
    textTransform: 'uppercase',
    fontStyle: 'italic',
  },
  variants: {
    primary: {
      fontWeight: 'semibold',
      fontSize: 'lg',
      padding: '0 30px',

      bg: 'primary',
      background: 'primary',
      color: 'blackColor',

      _hover: {
        filter: 'brightness(0.8)',
        bg: 'primary',
        background: 'primary',
        color: 'black',
      },

      _active: {
        filter: 'brightness(0.9)',
        bg: 'primary',
        background: 'primary',
        color: 'black',
      },
    },
    outline: {
      cursor: 'pointer',
      bg: 'transparent',
      border: '1px solid',
      borderColor: 'white',
      transition: 'all 0.2s linear',

      _hover: {
        bg: 'white',
        color: 'black',
      },
    },

    'outline-primary': {
      bg: 'transparent',
      background: 'transparent',
      color: 'primary.500',
      border: '1px solid',
      borderColor: 'primary.500',

      _hover: {
        filter: 'brightness(0.95)',
        bg: 'primary',
        // background: hexToRgba(colors.primary, 0.1),
        color: 'primary',
      },

      _active: {
        filter: 'brightness(0.95)',
        bg: 'primary',
        // background: hexToRgba(colors.primary, 0.3),
        color: 'primary',
      },
    },

    secondary: {
      bg: 'secondary',
      background: 'secondary',
      color: 'white',

      _hover: {
        filter: 'brightness(0.8)',
        bg: 'secondary',
        background: 'secondary',
        color: 'white',
      },

      _active: {
        filter: 'brightness(0.9)',
        bg: 'secondary',
        background: 'secondary',
        color: 'white',
      },
    },

    'outline-secondary': {
      bg: 'transparent',
      background: 'transparent',
      color: 'secondary',
      border: '1px solid',
      borderColor: 'secondary',

      w: '100%',
      maxW: '362px',
      h: '50px',
      height: '50px',

      _hover: {
        filter: 'brightness(0.95)',
        bg: 'secondary',
        // background: hexToRgba(colors.secondary, 0.1),
        color: 'secondary',
      },

      _active: {
        filter: 'brightness(0.95)',
        bg: 'secondary',
        // background: hexToRgba(colors.secondary, 0.3),
        color: 'secondary',
      },
    },

    dark: {
      bg: 'gray.900',
      background: 'gray.900',
      color: 'white',

      _hover: {
        filter: 'brightness(0.8)',
        bg: 'gray.900',
        background: 'gray.600',
        color: 'white',
      },

      _active: {
        filter: 'brightness(0.9)',
        bg: 'gray.900',
        background: 'gray.600',
        color: 'white',
      },
    },

    'outline-dark': {
      bg: 'transparent',
      background: 'transparent',
      color: 'gray.900',
      border: '1px solid',
      borderColor: 'gray.900',

      w: '100%',
      maxW: '362px',
      h: '50px',
      height: '50px',

      _hover: {
        filter: 'brightness(0.95)',
        bg: 'gray.900',
        background: 'gray.600',
        color: 'gray.900',
      },

      _active: {
        filter: 'brightness(0.95)',
        bg: 'gray.900',
        background: 'gray.600',
        color: 'gray.900',
      },
    },

    'purple-gradient': {
      background: 'linear-gradient(90deg, rgb(19 0 46) 0%, rgb(23 4 82) 100%)',
      color: 'white',
      textTransform: 'uppercase',

      _hover: {
        filter: 'brightness(0.8)',
        background:
          'linear-gradient(90deg, rgb(19 0 46) 0%, rgb(23 4 82) 100%)',
        color: 'white',
      },

      _active: {
        filter: 'brightness(0.9)',
        background:
          'linear-gradient(90deg, rgb(19 0 46) 0%, rgb(23 4 82) 100%)',
        color: 'white',
      },
    },

    light: {
      bg: 'gray.100',
      background: 'gray.100',
      color: 'primary.900',

      '.chakra-text': {
        color: 'red',
        bgGradient: 'linear-gradient(to right, rgb(41 26 78), rgb(58 40 112))',
        bgClip: 'text',
      },
      _hover: {
        filter: 'brightness(0.8)',
        bg: 'gray.200',
      },

      _active: {
        filter: 'brightness(0.9)',
        bg: 'gray.200',
      },
    },
    secondaryLight: {
      bg: 'white',
      background: 'white',
      color: 'purple.500',
      fontWeight: 'bold',
      border: '1px solid',
      borderColor: 'white',
      transition: 'all 0.2s linear',
      _hover: {
        background: 'transparent',
        color: 'white',
      },
    },
  },
};

export default Button;
