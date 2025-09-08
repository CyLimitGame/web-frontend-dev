import React from 'react';
import { useTranslation } from 'next-i18next';
import { Text } from '@chakra-ui/react';

import TableInfo from '../core/Table/TableInfo';

import { historyBirdColumns } from './data';

import { useGetNftBids } from '@/queries/useCard';
import { Sale } from '@/typings/card';
import { BaseModal } from '@/components/Modal';

type Props = {
  saleData: Sale | null;
  onClose: () => void;
};

const BidHistory = ({ saleData, onClose }: Props) => {
  const { t } = useTranslation();
  const { data: nftBidsData, isLoading: isLoadingBidsData } = useGetNftBids(
    {
      page: 1,
      limit: Number.MAX_SAFE_INTEGER,
      nftId: saleData?.nft?._id || '',
    },
    {
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
        isLoading={isLoadingBidsData}
        data={nftBidsData?.items || []}
        formatCell={historyBirdColumns}
        tableContainerProps={{
          border: 0,
          px: 0,
        }}
      />
    </BaseModal>
  );
};

export default BidHistory;
