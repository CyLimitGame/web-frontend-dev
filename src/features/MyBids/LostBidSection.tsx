import React from 'react';
import { Box } from '@chakra-ui/react';

import { AuctionCard } from '@/features/core/Cards';
import { useGetUserProfile } from '@/queries/useUser';
import { DataGrid, Text } from '@/components/Common';
import { useGetLostBidNfts } from '@/queries/useAuction';

const LostBidSection = () => {
  const { data } = useGetUserProfile();
  const userId = data?.id as string;

  const { data: lostBids, isLoading } = useGetLostBidNfts({ userId });

  return (
    <Box pt={2}>
      <Text translateText="lost_bids" mb={5} fontSize="2xl" fontWeight="bold" />
      <DataGrid
        data={lostBids || []}
        gap={[2, 4, 4]}
        columns={[2, 2, 3, 4]}
        renderItem={(item) => <AuctionCard item={item} isShowAction={false} />}
        isLoading={isLoading}
        type="common"
      />
    </Box>
  );
};

export default LostBidSection;
