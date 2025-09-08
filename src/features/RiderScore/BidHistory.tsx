import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Text } from '@chakra-ui/react';

import TableInfo from '../core/Table/TableInfo';

import { LIMIT_RIDER_SCORE, historyBirdColumns } from './data';

import { useGetNftBids } from '@/queries/useCard';
import { Sale } from '@/typings/card';
import { BaseModal } from '@/components/Modal';

type Props = {
  saleData: Sale | null;
  onClose: () => void;
};

const BidHistory = ({ saleData, onClose }: Props) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const {
    data: nftBidsData,
    isLoading: isLoadingBidsData,
    isFetching: isFetchingBidsData,
  } = useGetNftBids(
    {
      page,
      limit: LIMIT_RIDER_SCORE,
      nftId: saleData?.nft?._id || '',
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <BaseModal
      isOpen={!!saleData}
      onClose={onClose}
      title={t('bid_history')}
      size="3xl"
      closeable
    >
      {nftBidsData?.items && nftBidsData?.items?.length === 0 && (
        <Text textAlign="center">{t('no_data')}</Text>
      )}
      <TableInfo
        isLoading={isLoadingBidsData || isFetchingBidsData}
        data={nftBidsData?.items || []}
        formatCell={historyBirdColumns}
        mb="34px"
        metaData={{
          page,
        }}
        tableContainerProps={{
          border: 0,
        }}
        pagination={{
          total: nftBidsData?.total || 0,
          limit: LIMIT_RIDER_SCORE,
          page,
          onChangePage: setPage,
        }}
      />
    </BaseModal>
  );
};

export default BidHistory;
