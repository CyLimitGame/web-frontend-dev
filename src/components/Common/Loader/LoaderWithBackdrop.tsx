import React from 'react';
import { Flex, FlexProps, Spinner, SpinnerProps } from '@chakra-ui/react';

type Props = SpinnerProps & {
  isLoading?: boolean;
  wrapperProps?: FlexProps;
};

const LoaderWithBackdrop = ({
  isLoading,
  wrapperProps = {},
  ...rest
}: Props) => {
  if (!isLoading) return null;
  return (
    <Flex
      position="absolute"
      inset="0"
      alignItems="center"
      justifyContent="center"
      backgroundColor="backAlpha.300"
      zIndex="10"
      {...wrapperProps}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="primary.500"
        size="xl"
        {...rest}
      />
    </Flex>
  );
};

export default LoaderWithBackdrop;
