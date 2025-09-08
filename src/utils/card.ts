import _ from 'lodash';
import moment from 'moment';

import { formatPrice } from './number';

import { MarketType } from '@/typings/card.enum';
import { FilterBy } from '@/typings/card.enum';
import { SortBy } from '@/typings/card.enum';
import { PaymentStatus } from '@/typings/payment.enum';
import { NEXT_PUBLIC_POLYGON_SCAN } from '@/config/appConfig';

export const getParamsWithFilterBy = (value?: FilterBy) => {
  return value
    ? {
        [FilterBy.NEW_CARD]: {
          sortBy: SortBy.AUCTION_END_DATE,
        },
        [FilterBy.BEST_VALUE]: {},
        [FilterBy.BUNDLES]: {
          marketType: MarketType.AUCTION,
        },
        [FilterBy.LASTING_LISTING]: {},
        [FilterBy.FIRST_SERIAL_NUMBER]: {
          firstSerialNumber: 1,
        },
      }[value]
    : {};
};

type CardData = {
  auctionStartPrice: number;
  auctionStepMinPrice: number;
  auctionBestBid: {
    amount: number;
  };
};

export const getPrice = (item: Partial<CardData>) => {
  const price = item
    ? _.sum([item.auctionBestBid?.amount || item.auctionStartPrice])
    : 0;
  return Number(formatPrice(price));
};

export const getCurrentPrice = (item: Partial<CardData>) => {
  const price = item
    ? _.sum([
        item.auctionBestBid?.amount || item?.auctionStartPrice,
        item.auctionStepMinPrice,
      ])
    : 0;
  return _.ceil(price, 2);
};

export const sortHistoriesPayment = (
  items: Partial<{ id: string; status: PaymentStatus }[]>
) => {
  const data = _.filter(items, { status: PaymentStatus.ACCEPTED });
  return _.orderBy(data, ['amount'], ['desc']) || [];
};

export const getParamsCardBonus = (data: any, gameTeamId?: string) => {
  const nfts = _.filter(data, (item) => item.rarity !== 'trainee');
  const naCards = _.filter(data, (item) => item.rarity === 'trainee');

  return {
    nftIds: _.map(nfts, (nft) => nft.id),
    naCardIds: _.map(naCards, (card) => card.id),
    gameTeamId,
  };
};

export const getRiderIds = (data: any) => {
  const riderIds = _.map(data, (item) =>
    item.rarity === 'trainee' ? _.get(item, 'rider.id') : item.riderId
  );

  return {
    riderIds,
  };
};

export const getLinkPolygonScan = (contractAddress: string) =>
  `${NEXT_PUBLIC_POLYGON_SCAN}/address/${contractAddress}`;

export const getAgeByDateOfBirth = (date: string) => {
  const now = moment();
  const dob = moment(date);

  if (dob.isValid()) {
    return now.diff(dob, 'years');
  }

  return 0;
};

export const groupCards = (data: any) => {
  return [
    ..._.get(data, 'nfts', []),
    ..._.get(data, 'freeCards', []),
    ..._.get(data, 'naCards', []),
  ];
};
