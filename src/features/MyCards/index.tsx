import React, { useState } from 'react';

import { MyTeamLayout } from '@/layouts';
import { OwnerCard } from '@/features/core/Cards';
import { DataGrid, Pagination } from '@/components/Common';
import { FILTER_LIMIT } from '@/constants/filter';
import useParamsQuery from '@/hooks/useGetParams';
import { CardItem, FilterCardParams, FilterCards } from '@/typings/card';
import CardFilter, { defaultFilter } from '@/features/core/Common/CardFilter';
import { useGetCardsMyTeam, useGetParamsCardFilter } from '@/queries/useCard';
import { PATH } from '@/constants/path';
import { navigateTo } from '@/utils/navigation';
import { useListenTransferStatus } from '@/queries/useTransfer';

const DEFAULT_AGE = [0, 0];

const MyCards = () => {
  const { getParamsWithLocation } = useParamsQuery();
  const params = getParamsWithLocation();
  const [page, setPage] = useState(1);
  const [myCardFilter, setMyCardFilter] = useState<FilterCards>({
    ...defaultFilter,
    ...params,
    age: DEFAULT_AGE,
  });

  useListenTransferStatus();

  const { data, isLoading } = useGetCardsMyTeam({
    ...myCardFilter,
    page,
  });

  const { data: filerCardData } = useGetParamsCardFilter({});

  const filterData = filerCardData
    ? {
        ...filerCardData,
        rarities: [
          ...filerCardData.rarities,
          { value: 'white', label: 'white' },
        ],
      }
    : {};

  const handleFilter = (values: FilterCards) => {
    setMyCardFilter({ ...myCardFilter, ...values });
    navigateTo(PATH.MY_CARDS, {
      ...myCardFilter,
      ...values,
      page,
    });
  };

  return (
    <MyTeamLayout
      renderAsideContent={() => (
        <CardFilter
          data={filterData as FilterCardParams}
          onFilter={handleFilter}
          defaultFilter={{ age: DEFAULT_AGE }}
        />
      )}
    >
      <DataGrid
        columns={[2, 2, 3]}
        gap={[2, 2, 4]}
        data={(data?.items || []) as CardItem[]}
        renderItem={(record) => <OwnerCard item={record} />}
        prefix="my-card"
        isLoading={isLoading}
      />
      <Pagination
        total={data?.total || 0}
        page={page}
        limit={FILTER_LIMIT}
        onChangePage={setPage}
      />
    </MyTeamLayout>
  );
};

export default MyCards;
