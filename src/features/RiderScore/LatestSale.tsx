import { Box, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { cardHistoryColumns, LIMIT_RIDER_SCORE } from './data';

import { Text } from '@/components/Common';
import { SelectInput } from '@/components/Inputs';
import TableInfo from '@/features/core/Table/TableInfo';
import { useGetNftsSale } from '@/queries/useCard';
import { Sale } from '@/typings/card';

type Props = {
  riderId: string;
  onViewDetail: (data: Sale) => void;
};

const LatestSale = ({ riderId, onViewDetail }: Props) => {
  const { register, watch } = useForm({ defaultValues: { rarity: 'blue' } });
  const rarity = watch('rarity');
  const [page, setPage] = useState(1);
  const {
    data: nftSaleData,
    isLoading: isLoadingSaleData,
    isFetching: isFetchingSaleData,
  } = useGetNftsSale(
    {
      page,
      limit: LIMIT_RIDER_SCORE,
      riderId: riderId,
      rarity: [rarity],
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="end" mb={2}>
        <Text
          translateText="latest_sales"
          fontSize={['sm', 'md']}
          fontWeight="bold"
        />
        <Box>
          <SelectInput
            choices={[
              { id: 'blue', label: 'blue', value: 'blue' },
              { id: 'pink', label: 'pink', value: 'pink' },
              { id: 'yellow', label: 'yellow', value: 'yellow' },
            ]}
            w="160px"
            {...register('rarity')}
            onChange={(e) => {
              register('rarity').onChange(e);
              setPage(1);
            }}
          />
        </Box>
      </Flex>
      <TableInfo
        isLoading={isLoadingSaleData || isFetchingSaleData}
        data={nftSaleData?.items || []}
        formatCell={cardHistoryColumns}
        mb="34px"
        tableContainerProps={{
          overflowX: 'auto',
          sx: {
            '&>table': {
              minW: '600px',
            },
          },
        }}
        pagination={{
          total: nftSaleData?.total || 0,
          limit: LIMIT_RIDER_SCORE,
          page,
          onChangePage: setPage,
        }}
        metaData={{
          onClickViewDetail: (saleData: Sale) => {
            onViewDetail(saleData);
          },
        }}
      />
    </Box>
  );
};

export default LatestSale;
