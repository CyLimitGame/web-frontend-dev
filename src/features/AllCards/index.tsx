import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import CardData from './components/CardData';

import { sanitizeFilterCardRequest } from '@/features/core/Cards/FilterCard/actions';
import Filter from '@/features/core/Cards/FilterCard';
import { Container, Pagination } from '@/components/Common';
import MainLayout from '@/layouts/MainLayout';
import breakpoints from '@/theme/foundations/breakpoints';
import { useListenPayment } from '@/queries/usePayment';
import { FILTER_LIMIT } from '@/constants/filter';

import { MarketType, OrderBy, SortBy } from '@/typings/card.enum';
import { useGetCards, useGetParamsCardFilter } from '@/queries/useCard';
import { changeQueryRouter } from '@/utils/common';

const AllCards = () => {
  useListenPayment({});
  const { t } = useTranslation();
  const router = useRouter();
  const marketType = _.get(
    router,
    'query.marketType',
    MarketType.AUCTION
  ) as MarketType;

  const { data: paramsCardFilter, isLoading: isLoadingCardParams } =
    useGetParamsCardFilter({
      marketType,
    });

  const { data, isLoading } = useGetCards(
    sanitizeFilterCardRequest({
      router: router,
      riderOption: paramsCardFilter?.startListOfRiders || [],
      addFiled: () => ({
        sortBy:
          marketType === MarketType.AUCTION
            ? SortBy.AUCTION_END_DATE
            : marketType === MarketType.FIXED
            ? SortBy.FIXED_END_DATE
            : SortBy.CREATE_AT,
        marketType,
        orderBy: OrderBy.ASC,
      }),
    })
  );

  return (
    <MainLayout>
      <Box mb={10} borderBottom="1px solid" borderColor="border">
        <Container maxWidth={breakpoints['2xl']}>
          <Flex gap={4}>
            <Filter
              resetDataCondition={marketType}
              paramsCardFilter={paramsCardFilter}
              components={{
                ForSale: () => <></>,
              }}
              pr={4}
              header={
                <>
                  <Text
                    mt="20px"
                    textTransform="uppercase"
                    fontSize="2xl"
                    fontWeight="bold"
                  >
                    {t(
                      marketType === MarketType.AUCTION
                        ? 'auction_title'
                        : 'manager_sales_title'
                    )}
                  </Text>
                  <Text
                    textTransform="uppercase"
                    fontSize="xl"
                    fontWeight="bold"
                    color="gray.500"
                  >
                    {t('filters')}
                  </Text>
                </>
              }
            />
            <Box flex={1} py={[2, 2, 4]}>
              <CardData
                isLoading={isLoading || isLoadingCardParams}
                data={data?.items || []}
              />
              <Pagination
                page={Number(_.get(router.query, 'page', 1))}
                total={data?.total || 0}
                limit={FILTER_LIMIT}
                onChangePage={(page) => changeQueryRouter(router, { page })}
              />
            </Box>
          </Flex>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default AllCards;
