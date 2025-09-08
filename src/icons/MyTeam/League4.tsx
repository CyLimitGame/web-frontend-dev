import { createIcon } from '@chakra-ui/icon';
import React from 'react';

const League4Icon = createIcon({
  viewBox: '0 0 28 29',
  defaultProps: {
    width: '28px',
    height: '29px',
  },
  path: (
    <>
      <rect y="0.5" width="28" height="28" rx="6" fill="#6B7280" />
      <path d="M24 14.5L7.5 24.0263L7.5 4.97372L24 14.5Z" fill="white" />
    </>
  ),
});

export default League4Icon;
