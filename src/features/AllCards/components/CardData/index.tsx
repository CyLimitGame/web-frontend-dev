import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import {
  AuctionSkeleton,
  DataGrid,
  SecondarySkeleton,
} from '@/components/Common';
import {
  CardBundleItem as CardBundleItemProps,
  CardItem as CardItemProps,
} from '@/typings/card';
import useParamsQuery from '@/hooks/useGetParams';
import { FilterBy, MarketType } from '@/typings/card.enum';
import { AuctionCard, BundleCard, SecondaryCard } from '@/features/core/Cards';
import { FILTER_LIMIT } from '@/constants/filter';

type Props = {
  data: CardItemProps[] | CardBundleItemProps[];
  isLoading: boolean;
};

const CardData = ({ data, isLoading }: Props) => {
  const router = useRouter();
  const [isRouterLoading, setIsRouterLoading] = useState(false);
  const { getParam } = useParamsQuery();
  const filterBy: FilterBy = getParam('filterBy') || FilterBy.NEW_CARD;
  const marketType: MarketType = getParam('marketType') || MarketType.AUCTION;

  useEffect(() => {
    const showLoading = (path: string) => {
      const isMatchingPath = path.search('market') !== -1;
      isMatchingPath && setIsRouterLoading(true);
    };
    const hideLoading = () => setIsRouterLoading(false);

    router.events.on('routeChangeStart', showLoading);

    router.events.on('routeChangeComplete', hideLoading);

    return () => {
      router.events.off('routeChangeStart', showLoading);
      router.events.off('routeChangeComplete', hideLoading);
    };
  }, []);

  return (
    <Box>
      <DataGrid
        type={marketType === MarketType.AUCTION ? 'primary' : 'secondary'}
        columns={[2, 2, 3, 4]}
        gap={[2, 2, 4]}
        data={data}
        isLoading={isLoading || isRouterLoading}
        // isLoading={true}
        renderItem={(item) => {
          if (marketType === MarketType.FIXED) {
            return <SecondaryCard item={item} />;
          }
          if (
            marketType === MarketType.AUCTION &&
            filterBy === FilterBy.BUNDLES
          ) {
            return <BundleCard item={item} />;
          }

          if (
            marketType === MarketType.AUCTION &&
            filterBy !== FilterBy.BUNDLES
          ) {
            return <AuctionCard item={item} />;
          }
          return null;
        }}
        numberOfSkeleton={FILTER_LIMIT}
        renderSkeleton={() => {
          if (marketType === MarketType.AUCTION) {
            return <AuctionSkeleton />;
          }
          return <SecondarySkeleton />;
        }}
      />
    </Box>
  );
};

export default CardData;
