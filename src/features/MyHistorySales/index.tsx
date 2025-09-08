import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';

import { SaleHistoryCard } from '@/features/core/Cards';
import MyProfileLayout from '@/layouts/MyProfileLayout';
import { DataGrid, Pagination } from '@/components/Common';
import { useGetMyNftSales } from '@/queries/useUser';
import { FILTER_LIMIT } from '@/constants/filter';

const MyHistorySales = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetMyNftSales({ page, limit: FILTER_LIMIT });

  return (
    <MyProfileLayout>
      <Box pt={5}>
        <DataGrid
          data={data?.items || []}
          gap={[2, 4, 4]}
          columns={[2, 2, 3, 4]}
          renderItem={(item) => <SaleHistoryCard item={item} />}
          isLoading={isLoading}
          type="common"
        />
        <Pagination
          page={page}
          total={data?.total || 0}
          limit={FILTER_LIMIT}
          onChangePage={setPage}
        />
      </Box>
    </MyProfileLayout>
  );
};

export default MyHistorySales;
