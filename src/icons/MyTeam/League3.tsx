import { createIcon } from '@chakra-ui/icon';
import React from 'react';

const League3Icon = createIcon({
  viewBox: '0 0 29 29',
  defaultProps: {
    width: '29px',
    height: '29px',
  },
  path: (
    <>
      <rect x="0.5" y="0.5" width="28" height="28" rx="6" fill="#055A7F" />
      <g clipPath="url(#clip0_7370_33407)">
        <path
          d="M25.5 7.14602L21.854 3.5L14.5 10.854L7.14602 3.5L3.5 7.14602L10.854 14.5L3.5 21.854L7.14602 25.5L14.5 18.146L21.854 25.5L25.5 21.854L18.146 14.5L25.5 7.14602Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_7370_33407">
          <rect
            width="22"
            height="22"
            fill="white"
            transform="translate(3.5 3.5)"
          />
        </clipPath>
      </defs>
    </>
  ),
});

export default League3Icon;
