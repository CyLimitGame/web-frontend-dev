import { API_PATH } from '.';

import {
  AuctionCard,
  Bid,
  NftUserAuction,
  UseGetBidNftsProps,
} from '@/typings/auction';
import request from '@/utils/request';
import { sanitizeRequestBidItem } from '@/utils/sanitize';

export const getDetailCard = (id: string): Promise<AuctionCard> => {
  return request.get(`${API_PATH.GET_CARD}/${id}`);
};

export const bid = (data: Bid) => {
  return request.post(API_PATH.BID, sanitizeRequestBidItem(data));
};

export const getNftsWining = (): Promise<AuctionCard[]> => {
  return request.get(API_PATH.GET_NFTS_WINING);
};

export const claim = (id: string) => {
  return request.post(`/nfts/${id}/claim`);
};

export const getBestBidNfts = ({
  userId,
}: UseGetBidNftsProps): Promise<NftUserAuction[]> => {
  return request.get(`${API_PATH.GET_BIDS}/${userId}/best-bid-nfts`);
};

export const getLostBidNfts = ({
  userId,
}: UseGetBidNftsProps): Promise<NftUserAuction[]> => {
  return request.get(`${API_PATH.GET_BIDS}/${userId}/lost-bid-nfts`);
};
