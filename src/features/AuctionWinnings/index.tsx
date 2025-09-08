import React from 'react';

import { MyTeamLayout } from '@/layouts';
import { useGetNftsWining } from '@/queries/useAuction';
import { DataGrid } from '@/components/Common';
import { AuctionWinningCard } from '@/features/core/Cards';

const AuctionWinnings = () => {
  const { data: nftsWining, isLoading } = useGetNftsWining();
  return (
    <MyTeamLayout>
      <DataGrid
        columns={[2, 2, 3]}
        gap={[2, 2, 4]}
        data={nftsWining || []}
        isLoading={isLoading}
        renderItem={(item) => <AuctionWinningCard item={item} />}
      />
    </MyTeamLayout>
  );
};

export default AuctionWinnings;
