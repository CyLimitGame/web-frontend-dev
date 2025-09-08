import React from 'react';
import { Box } from '@chakra-ui/react';

import BestBidSection from './BestBidSection';
import LostBidSection from './LostBidSection';

import MyProfileLayout from '@/layouts/MyProfileLayout';

const MyBids = () => {
  return (
    <MyProfileLayout>
      <Box>
        <Box py={5}>
          <BestBidSection />
        </Box>
        <Box py={5}>
          <LostBidSection />
        </Box>
      </Box>
    </MyProfileLayout>
  );
};

export default MyBids;
