import React from 'react';
import { Flex } from '@chakra-ui/react';
import Link from 'next/link';

import { Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';

export default function Custom404() {
  return (
    <Flex
      h="100vh"
      w="100vw"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Text fontSize="2xl" fontWeight="bold" color="gray.500">
        404 Page not found
      </Text>
      <Link passHref href="/">
        <BaseButton mt={4} variant="light" colorScheme="primary">
          Back to home
        </BaseButton>
      </Link>
    </Flex>
  );
}
