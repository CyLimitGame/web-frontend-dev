import React from 'react';
import { Box } from '@chakra-ui/react';

import FollowingTable from './FollowingTable';

import MyProfileLayout from '@/layouts/MyProfileLayout';

const Follows = () => {
  return (
    <MyProfileLayout>
      <Box mt={10}>
        <FollowingTable />
      </Box>
    </MyProfileLayout>
  );
};

export default Follows;
