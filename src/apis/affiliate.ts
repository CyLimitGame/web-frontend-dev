import { API_PATH } from './api-path';

import request from '@/utils/request';
import { ListResponse } from '@/typings/common';
import {
  AffiliateReward,
  ClaimReward,
  ReferredReward,
  TakeReferredReward,
} from '@/typings/affiliate';

export const getReferredRewards = (): Promise<ListResponse<ReferredReward>> => {
  return request.get(API_PATH.GET_REFERRED_REWARDS);
};

export const takeReferredReward = (data: TakeReferredReward) => {
  return request.post(API_PATH.TAKE_REFERRAL_REWARD, data);
};

export const getDetailReferredReward = (
  id?: string
): Promise<AffiliateReward> => {
  return request.get(API_PATH.GET_DETAIL_REFERRED_REWARD, {
    params: { friendId: id },
  });
};

export const affiliateClaimReward = (data: ClaimReward) => {
  return request.post(API_PATH.AFFILIATE_CLAIM, data);
};

export const getAffiliateRewardSetting = () => {
  return request.get(API_PATH.GET_AFFILIATE_REWARD_SETTING);
};
