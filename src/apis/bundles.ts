import { API_PATH } from '.';

import { BundleBid, BundleCard } from '@/typings/bundle';
import request from '@/utils/request';
import { sanitizeRequestBidBundleItem } from '@/utils/sanitize';

export const getBundleDetailCard = (id: string): Promise<BundleCard> => {
  return request.get(`${API_PATH.GET_BUNDLES_DETAIL}/${id}`);
};

export const bidBundle = (data: BundleBid) => {
  return request.post(API_PATH.BUNDLES_BID, sanitizeRequestBidBundleItem(data));
};

export const getBundlesWining = (): Promise<BundleCard[]> => {
  return request.get(API_PATH.GET_BUNDLES_WINING);
};

export const claimBundle = (id: string) => {
  return request.post(`${API_PATH.CLAIM_BUNDLES}/${id}/claim`);
};
