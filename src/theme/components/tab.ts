import type { ComponentStyleConfig } from '@chakra-ui/theme';

const Tabs: ComponentStyleConfig = {
  defaultProps: {
    variant: 'primary',
  },
  baseStyle: {
    root: {
      // display: 'inline-block',
      button: {
        fontStyle: 'italic',
      },
    },
  },
  variants: {
    primary: {
      tablist: {
        border: 'none',
        backgroundColor: 'whiteAlpha.80',
        borderRadius: 'md',
        padding: 1,
      },
      tab: {
        flex: '1 1 0px',
        width: 0,
        border: 'none',
        borderRadius: 'md',
        fontSize: ['sm', 'md'],
        color: 'whiteAlpha.500',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        px: [4, 6],
        py: [2, 3],

        _selected: {
          color: 'white',
          backgroundColor: 'whiteAlpha.300',
        },
      },
    },

    secondary: {
      tablist: {
        position: 'relative',
        border: 'none',

        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '0',

          width: '100%',
          height: '1px',
          background: 'whiteAlpha.250',
        },
      },
      tab: {
        position: 'relative',
        border: 'none',
        color: 'gray.300',

        _selected: {
          color: 'primary',
          fontWeight: 'medium',

          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '0',

            borderRadius: '3px 3px 0 0',
            width: '100%',
            height: '3px',
            background: 'primary',
            zIndex: 1,
          },
        },
      },
    },
  },
};

export default Tabs;
