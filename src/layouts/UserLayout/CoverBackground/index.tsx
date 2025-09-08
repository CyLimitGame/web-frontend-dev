import React from 'react';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetProfileById } from '@/queries/useUser';

const CoverBackground = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetProfileById(id as string);

  return (
    <Box
      height="300px"
      position="relative"
      bg="gray.100"
      backgroundImage={`url("${data?.coverUrl}")`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    />
  );
};

export default CoverBackground;
