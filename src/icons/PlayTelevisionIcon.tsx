import { createIcon } from '@chakra-ui/icon';
import React from 'react';

const PlayTelevisionIcon = createIcon({
  viewBox: '0 0 25 24',
  defaultProps: {
    width: '25px',
    height: '24px',
    fill: 'none',
    color: 'white',
  },
  path: (
    <>
      <path
        d="M15.5 11.25L11 8.25V14.25L15.5 11.25Z"
        stroke="currentcolor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 18L20 18C20.8284 18 21.5 17.3284 21.5 16.5V6C21.5 5.17157 20.8284 4.5 20 4.5L5 4.5C4.17157 4.5 3.5 5.17157 3.5 6V16.5C3.5 17.3284 4.17157 18 5 18Z"
        stroke="currentcolor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 21H9.5"
        stroke="currentcolor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
});

export default PlayTelevisionIcon;
