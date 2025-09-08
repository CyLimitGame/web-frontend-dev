import { GlobalStyleProps, mode } from '@chakra-ui/theme-tools';

const styles = {
  global: (props: GlobalStyleProps) => {
    return {
      'html, body': {
        color: mode('gray.800', 'white')(props),
        bg: mode('white', 'background.default')(props),
        fontStyle: 'italic',
        textTransform: 'uppercase',
      },

      '&::-webkit-scrollbar': {
        width: '6px',
        height: '6px',
      },

      '&::-webkit-scrollbar-thumb': {
        borderRadius: '4px',
        backgroundColor: 'gray.400',
      },

      '.scroll': {
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'nickel',
        },
      },
    };
  },
  colors: {
    gray: {
      700: '#1f2733',
    },
  },
};

export default styles;
