import React from 'react';
import { Box } from '@chakra-ui/react';

import { AuctionCard } from '@/features/core/Cards';
import { useGetUserProfile } from '@/queries/useUser';
import { DataGrid, Text } from '@/components/Common';
import { useGetBestBidNfts } from '@/queries/useAuction';

const BestBidSection = () => {
  const { data } = useGetUserProfile();
  const userId = data?.id as string;

  const { data: bestBids, isLoading } = useGetBestBidNfts({ userId });

  return (
    <Box pt={2}>
      <Text translateText="best_bids" mb={5} fontSize="2xl" fontWeight="bold" />
      <DataGrid
        data={bestBids || []}
        gap={[2, 4, 4]}
        columns={[2, 2, 3, 4]}
        renderItem={(item) => <AuctionCard item={item} isShowAction={false} />}
        isLoading={isLoading}
        type="common"
      />
    </Box>
  );
};

export default BestBidSection;
