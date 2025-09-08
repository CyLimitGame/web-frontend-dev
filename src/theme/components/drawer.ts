import type { ComponentStyleConfig } from '@chakra-ui/theme';

const Drawer: ComponentStyleConfig = {
  baseStyle: {
    dialog: {
      background: 'background.default',
    },
    header: {
      borderBottom: '1px solid',
      borderColor: 'border',
    },
  },
};

export default Drawer;
