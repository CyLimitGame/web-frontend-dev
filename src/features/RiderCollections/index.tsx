import React from 'react';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import { Box, Flex, Text } from '@chakra-ui/react';

import Filter from '../core/Cards/FilterCard';

import { sanitizeFilterCardRequest } from '../core/Cards/FilterCard/actions';

import Rarity from '../core/Cards/FilterCard/Rarity';

import { AuctionCard, RiderCard, SecondaryCard } from '@/features/core/Cards';
import RiderCollectionLayout from '@/layouts/RiderCollectionLayout';
import useParamsQuery from '@/hooks/useGetParams';
import { useGetNftsByRider, useGetParamsCardFilter } from '@/queries/useCard';
import { DataGrid, Pagination } from '@/components/Common';
import { CardItem } from '@/typings/card';
import { FILTER_LIMIT } from '@/constants/filter';
import { MarketType } from '@/typings/card.enum';
import { changeQueryRouter } from '@/utils/common';

const RiderCollections = () => {
  const { t } = useTranslation();
  const { getParam, router } = useParamsQuery();
  const riderId = getParam('id');
  const isSale = _.get(router, 'query.isSale') === 'true';

  const { data: paramsCardFilter, isLoading: isLoadingCardParams } =
    useGetParamsCardFilter({
      riderId,
      marketType: isSale ? [MarketType.FIXED, MarketType.AUCTION] : undefined,
    });
  const { data, isLoading } = useGetNftsByRider(
    sanitizeFilterCardRequest({
      router: router,
      riderOption: paramsCardFilter?.startListOfRiders || [],
      addFiled: (values) => ({
        riderId,
        marketType: _.get(values, 'isSale', false)
          ? [MarketType.FIXED, MarketType.AUCTION]
          : undefined,
      }),
    })
  );

  return (
    <RiderCollectionLayout name={''}>
      <Flex gap={4}>
        <Filter
          pr={4}
          header={
            <Text
              mt="20px"
              textTransform="uppercase"
              fontSize="xl"
              fontWeight="bold"
              color="gray.500"
            >
              {t('filters')}
            </Text>
          }
          paramsCardFilter={paramsCardFilter}
          components={{
            Rarity: () => <Rarity title="scarcity" />,
            Price: ({ form, defaultComponent }) => {
              const isSale = form.watch('isSale');
              if (!isSale) return <></>;
              return defaultComponent;
            },
            Search: () => <></>,
          }}
        />
        <Box flex="1">
          <DataGrid
            columns={[2, 2, 3, 4]}
            gap={[2, 2, 4]}
            data={(data?.items || []) as CardItem[]}
            renderItem={(item) => {
              switch (item?.marketType) {
                case MarketType.FIXED:
                  return <SecondaryCard item={item} h="100%" isHoverPrice />;
                case MarketType.AUCTION:
                  return <AuctionCard item={item} h="100%" />;
                default:
                  return <RiderCard item={item} riderId={riderId} />;
              }
            }}
            prefix="my-card"
            isLoading={isLoading || isLoadingCardParams}
          />
          <Pagination
            page={Number(_.get(router.query, 'page', 1))}
            total={data?.total || 0}
            limit={FILTER_LIMIT}
            onChangePage={(page) => changeQueryRouter(router, { page })}
          />
        </Box>
      </Flex>
    </RiderCollectionLayout>
  );
};

export default RiderCollections;
