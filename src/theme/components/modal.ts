import type { ComponentStyleConfig } from '@chakra-ui/theme';

const Modal: ComponentStyleConfig = {
  baseStyle: {
    dialog: {
      borderRadius: '20px',
      overflow: 'hidden',
      border: '2px solid',
      borderColor: 'gray.300',
    },
    body: {
      marginRight: '8px',
      padding: '24px 24px',
      width: '100%',
      background: 'background.default',
      borderBottomRadius: '15px',
    },
    header: {
      padding: '12px 24px',
      background: 'background.default',
      borderBottom: '2px solid',
      borderColor: 'border',
    },
    overlay: {
      // backdropFilter: 'blur(20px)',
    },
  },
};

export default Modal;
