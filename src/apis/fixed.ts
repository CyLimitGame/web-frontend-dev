import { API_PATH } from '.';

import request from '@/utils/request';
import { SellNft } from '@/typings/fixed';
import { sanitizeSellItem } from '@/utils/sanitize';

export const buyNft = (nftId: string) => {
  return request.post(API_PATH.BUY_NFT, { nftId });
};

export const sellNft = (body: SellNft) => {
  return request.post(`/nfts/${body.id}/sell`, sanitizeSellItem(body));
};

export const cancelSell = (id: string) => {
  return request.post(`/nfts/${id}/cancel-selling`);
};
