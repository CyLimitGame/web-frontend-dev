import { createIcon } from '@chakra-ui/icon';
import React from 'react';

const HexagonIcon = createIcon({
  viewBox: '0 0 22 24',
  defaultProps: {
    color: '#1F0B57',
  },
  path: (
    <>
      <path
        d="M0.857696 6.28867L10.75 0.57735L20.6423 6.28867V17.7113L10.75 23.4227L0.857696 17.7113V6.28867Z"
        fill="currentColor"
        stroke="white"
      />
    </>
  ),
});

export default HexagonIcon;
