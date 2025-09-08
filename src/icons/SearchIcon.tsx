import { createIcon } from '@chakra-ui/icon';
import React from 'react';

const SearchIcon = createIcon({
  viewBox: '0 0 24 24',
  defaultProps: {
    width: '24px',
    height: '24px',
    fill: 'none',
    stroke: 'gray.900',
  },
  path: (
    <>
      <path
        d="M10.875 18.75C15.2242 18.75 18.75 15.2242 18.75 10.875C18.75 6.52576 15.2242 3 10.875 3C6.52576 3 3 6.52576 3 10.875C3 15.2242 6.52576 18.75 10.875 18.75Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4443 16.4438L21.0006 21"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
});

export default SearchIcon;
