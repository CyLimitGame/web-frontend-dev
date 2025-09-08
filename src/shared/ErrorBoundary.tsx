import React, { Component, ErrorInfo } from 'react';
import Link from 'next/link';
import { Flex } from '@chakra-ui/react';

import { Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }

  handleTryAgain = (): void => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Flex
          h="100vh"
          w="100vw"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Text fontSize="2xl" fontWeight="bold" color="gray.500">
            Oops, something went wrong!
          </Text>

          <Link passHref href="/">
            <BaseButton mt={4} variant="light" colorScheme="primary">
              Back to home
            </BaseButton>
          </Link>
        </Flex>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
