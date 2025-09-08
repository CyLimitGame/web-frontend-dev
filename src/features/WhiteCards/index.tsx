import React, { useState } from 'react';

import { DataGrid, Pagination } from '@/components/Common';
import { FILTER_LIMIT } from '@/constants/filter';
import { WhiteCard } from '@/features/core/Cards';
import { useGetWhiteCards } from '@/queries/useCard';
import { MyTeamLayout } from '@/layouts';

// TODO will delete when new feature is good working
const WhiteCards = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetWhiteCards({ limit: FILTER_LIMIT, page });

  const handleChangePage = (pageValue: number) => {
    setPage(pageValue);
  };

  return (
    <MyTeamLayout>
      <DataGrid
        columns={[2, 2, 3]}
        gap={[2, 2, 4]}
        data={data?.items || []}
        renderItem={(record) => <WhiteCard item={record} />}
        prefix="white-card"
        isLoading={isLoading}
      />
      <Pagination
        total={data?.total || 0}
        page={page || 1}
        limit={FILTER_LIMIT}
        onChangePage={handleChangePage}
      />
    </MyTeamLayout>
  );
};

export default WhiteCards;
