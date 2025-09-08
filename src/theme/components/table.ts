import type { ComponentStyleConfig } from '@chakra-ui/theme';

const Table: ComponentStyleConfig = {
  baseStyle: {},
  sizes: {
    md: {
      th: {
        fontSize: 'md',
        fontWeight: 'bold',
        textTransform: 'none',
        color: 'success.500',
        py: '4',
      },
      td: {
        fontSize: 'md',
        textTransform: 'none',
        py: '4',
      },
    },
  },
  variants: {
    secondary: {
      sizes: {
        md: {
          color: 'whiteAlpha.500',
        },
      },
      th: {
        borderBottom: '1px dashed',
        borderColor: 'whiteAlpha.280',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: ['xs', 'sm', 'md'],
        padding: ['4px 8px', '6px 12px', '6px 12px', '10px 12px'],
        color: 'whiteAlpha.500',
        '&:first-child': {
          textAlign: 'left',
        },
        '&:last-child': {
          textAlign: 'right',
        },
      },
      tbody: {
        '& tr:not(:last-child)': {
          borderBottom: '1px dashed',
          borderColor: 'whiteAlpha.280',
        },
        '& td:first-child': {
          textAlign: 'left',
        },
        '& td:last-child': {
          textAlign: 'right',
        },
      },
      td: {
        border: 0,
        textAlign: 'center',
        padding: ['4px 8px', '6px 12px', '6px 12px', '10px 12px'],
        fontSize: ['xs', 'sm', 'md'],
        wordBreak: 'break-all',
        whiteSpace: 'break-spaces',
      },
    },
  },
  defaultProps: {
    size: 'md',
  },
};

export default Table;
