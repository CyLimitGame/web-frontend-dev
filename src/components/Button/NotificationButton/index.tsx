import React from 'react';
import { IconProps } from '@chakra-ui/react';

import { NotificationIcon } from '@/icons';

const NotificationButton = (props: IconProps) => {
  return <NotificationIcon cursor="pointer" {...props} />;
};

export default NotificationButton;
