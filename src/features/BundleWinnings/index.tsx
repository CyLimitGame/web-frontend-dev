import React from 'react';

import { MyTeamLayout } from '@/layouts';
import { DataGrid } from '@/components/Common';
import { BundleWinningCard } from '@/features/core/Cards';
import { useGetBundlesWining } from '@/queries/useBundles';

const BundleWinnings = () => {
  const { data: bundlesWining, isLoading } = useGetBundlesWining();
  return (
    <MyTeamLayout>
      <DataGrid
        columns={[2, 2, 3]}
        gap={[2, 2, 4]}
        data={bundlesWining || []}
        isLoading={isLoading}
        renderItem={(item) => <BundleWinningCard item={item} />}
      />
    </MyTeamLayout>
  );
};

export default BundleWinnings;
