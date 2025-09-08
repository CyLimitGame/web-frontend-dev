import { createIcon } from '@chakra-ui/icon';
import React from 'react';

const WalletOutlineIcon = createIcon({
  viewBox: '0 0 24 24',
  defaultProps: {
    fill: 'none',
  },
  path: (
    <>
      <path
        d="M19.7143 9.33333V5.33333C19.7143 4.59695 19.1387 4 18.4286 4L4.28571 4C3.57564 4 3 4.59695 3 5.33333L3 18.6667C3 19.403 3.57563 20 4.28571 20H18.4286C19.1387 20 19.7143 19.403 19.7143 18.6667V14.6667M20.9109 9.33333H14.5714C13.1513 9.33333 12 10.5272 12 12C12 13.4728 13.1513 14.6667 14.5714 14.6667H20.9109C20.9601 14.6667 21 14.6253 21 14.5743V9.42574C21 9.37471 20.9601 9.33333 20.9109 9.33333Z"
        strokeWidth="1.5"
        fill="currentColor"
      />
    </>
  ),
});

export default WalletOutlineIcon;
