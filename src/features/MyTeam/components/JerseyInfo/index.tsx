import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { useGetUserProfile } from '@/queries/useUser';
import { JerseyWithSponsor, Text } from '@/components/Common';
import { Jersey, Sponsor } from '@/typings/user.enum';

const JerseyInfo = () => {
  const { data } = useGetUserProfile();

  return (
    <Flex alignItems="center" gap={4} flexWrap="wrap" w="100%">
      <JerseyWithSponsor
        jersey={data?.jersey as Jersey}
        sponsor={data?.sponsor as Sponsor}
        primaryColor={data?.primaryColor as string}
        secondaryColor={data?.secondaryColor as string}
        width="40px"
        height="40px"
      />
      <Box fontWeight="bold">
        <Text fontSize="xl">{data?.nickName}</Text>
        <Flex alignItems="center" gap={2}>
          <Text translateText="xp_available" />
          <Text color="yellow.400">{data?.totalXp}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default JerseyInfo;
