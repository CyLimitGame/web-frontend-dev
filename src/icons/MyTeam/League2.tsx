import { createIcon } from '@chakra-ui/icon';
import React from 'react';

const League2Icon = createIcon({
  viewBox: '0 0 28 29',
  defaultProps: {
    width: '28px',
    height: '29px',
  },
  path: (
    <>
      <rect x="0.5" y="0.5" width="28" height="28" rx="6" fill="#D44658" />
      <g clipPath="url(#clip0_7370_33440)">
        <path
          d="M12.3081 3.5L6.42188 15.2694H12.4178L9.42872 25.356L10.1063 25.7207L22.4109 10.9534H14.8938L20.3886 3.5H19.6131H12.3081Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_7370_33440">
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

export default League2Icon;
