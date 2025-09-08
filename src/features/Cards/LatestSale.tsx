import React, { useState } from 'react';

import _ from 'lodash';

import { LIMIT_RIDER_SCORE, saleHistoryColumns } from './data';
import BidHistory from './BidHistory';

import TableInfo from '@/features/core/Table/TableInfo';
import { useGetNftsSale } from '@/queries/useCard';
import { Sale } from '@/typings/card';

type Props = {
  riderId: string;
  rarity: string;
};

const LatestSale = ({ riderId, rarity }: Props) => {
  const [selectedSaleData, setSelectedSaleData] = useState<Sale | null>(null);
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading: isLoadingSaleData,
    isFetching: isFetchingSaleData,
  } = useGetNftsSale(
    {
      page,
      riderId,
      rarity: [rarity],
      limit: LIMIT_RIDER_SCORE,
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <TableInfo
        isLoading={isLoadingSaleData || isFetchingSaleData}
        title="latest_sales"
        data={_.map(data?.items, (item) => ({ ...item, riderId }))}
        formatCell={saleHistoryColumns}
        tableContainerProps={{
          overflowX: 'auto',
          sx: {
            '&>table': {
              minW: '600px',
            },
          },
        }}
        pagination={{
          total: data?.total || 0,
          limit: LIMIT_RIDER_SCORE,
          page,
          onChangePage: setPage,
        }}
        metaData={{
          onClickViewDetail: (saleData: Sale) => {
            setSelectedSaleData(saleData);
          },
        }}
      />
      <BidHistory
        saleData={selectedSaleData}
        onClose={() => setSelectedSaleData(null)}
      />
    </>
  );
};

export default LatestSale;
