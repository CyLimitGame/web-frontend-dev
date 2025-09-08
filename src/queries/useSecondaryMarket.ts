import { useMutation } from 'react-query';

import { buyNft, cancelSell, sellNft } from '@/apis/fixed';

export const useSellNft = () => {
  return useMutation(sellNft);
};

export const useBuyNft = () => {
  return useMutation(buyNft);
};

export const useCancelSell = () => {
  return useMutation(cancelSell);
};
