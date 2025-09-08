import { Box, Flex, Skeleton, Stack } from '@chakra-ui/react';
import React from 'react';

const GameCardSkeleton = () => {
  return (
    <Box>
      <Box border="1px solid white" borderRadius="xl" overflow="hidden" p={4}>
        <Skeleton w="80%" h="20px" />
        <Skeleton w="40%" h="20px" mt={2} />
        <Flex
          justifyContent="space-between"
          direction={['column', 'column', 'row']}
        >
          <Box flex={1}>
            <Box pos="relative" width="200px" height="100px" my={2}>
              <Skeleton w="100%" h="100%" />
            </Box>
          </Box>
          <Flex w="100%" justifyContent="space-between" flex={1}>
            <Box>
              <Skeleton boxSize="50px" borderRadius="md" />
            </Box>
            <Stack spacing={2}>
              <Skeleton w="100px" h="24px" />
              <Skeleton w="100px" h="24px" />
              <Skeleton w="100px" h="24px" />
              <Skeleton w="100px" h="24px" />
            </Stack>
          </Flex>
        </Flex>
        <Skeleton h="40px" w="72px" borderRadius="lg" />
      </Box>
      <Flex justifyContent="end" mt={2}>
        <Skeleton h="40px" w="160px" borderRadius="lg" />
      </Flex>
    </Box>
  );
};

export default GameCardSkeleton;
