import type { ComponentStyleConfig } from '@chakra-ui/theme';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Popover: ComponentStyleConfig = {
  baseStyle: {
    content: {
      background: 'background.default',
      _focusVisible: {
        outline: 0,
        boxShadow: 'none',
      },
    },
    header: {},
    body: {},
  },
};

export default Popover;
