import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/button';
import { Text } from '@chakra-ui/react';

const BaseButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button size={['lg', 'lg']} {...props}>
      <Text>{children}</Text>
    </Button>
  );
};

export default BaseButton;
