import { createIcon } from '@chakra-ui/icon';
import React from 'react';

const SpaceXIcon = createIcon({
  viewBox: '0 0 28 28',
  defaultProps: {
    width: '28px',
    height: '28px',
  },
  path: (
    <>
      <path
        d="M15.6468 12.4686L22.9321 4H21.2057L14.8799 11.3532L9.82741 4H4L11.6403 15.1193L4 24H5.72649L12.4068 16.2348L17.7425 24H23.5699L15.6464 12.4686H15.6468ZM13.2821 15.2173L12.508 14.1101L6.34857 5.29967H9.00037L13.9711 12.4099L14.7452 13.5172L21.2066 22.7594H18.5548L13.2821 15.2177V15.2173Z"
        fill="black"
      />
    </>
  ),
});

export default SpaceXIcon;
