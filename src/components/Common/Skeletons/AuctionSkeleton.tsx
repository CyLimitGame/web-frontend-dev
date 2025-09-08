import React from 'react';
import { Box, Skeleton } from '@chakra-ui/react';

const AuctionSkeleton = () => {
  return (
    <Box
      bg="cardOverlay"
      p={[2, 2, 3]}
      borderRadius={['2xl', '2xl', '3xl']}
      transition="all .2s"
    >
      <Box aspectRatio="0.65" borderTopRightRadius="2xl" overflow="hidden">
        <Skeleton w="100%" h="100%" />
      </Box>
      <Skeleton h="24px" w="50%" mx="auto" mt={2} />
      <Skeleton h="24px" w="50px" mx="auto" mt={2} />
      <Skeleton h="20px" w="80%" mx="auto" mt={2} />
      <Skeleton h={['32px', '48px']} w="100%" mt={[2, 4]} borderRadius="md" />
    </Box>
  );
};

export default AuctionSkeleton;
