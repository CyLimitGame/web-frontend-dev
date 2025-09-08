import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useTranslation } from 'next-i18next';

import { API_PATH } from '@/apis';
import {
  getReferredRewards,
  takeReferredReward,
  getDetailReferredReward,
  affiliateClaimReward,
  getAffiliateRewardSetting,
} from '@/apis/affiliate';
import { useToastMessage } from '@/hooks/useToastMessage';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';

export const useGetReferredRewards = () => {
  return useQuery([API_PATH.GET_REFERRED_REWARDS], getReferredRewards);
};

export const useTakeReferredReward = () => {
  const queryClient = useQueryClient();
  return useMutation(takeReferredReward, {
    onSuccess: () => {
      queryClient.invalidateQueries([API_PATH.GET_DETAIL_REFERRED_REWARD]);
    },
  });
};

export const useGetDetailReferredReward = (id: string, userId?: string) => {
  return useQuery(
    [API_PATH.GET_DETAIL_REFERRED_REWARD, id],
    () => getDetailReferredReward(id === userId ? undefined : id),
    { enabled: !!id }
  );
};

export const useAffiliateClaimReward = () => {
  const toast = useToastMessage();
  const { t } = useTranslation();
  return useMutation(affiliateClaimReward, {
    onSuccess: () => {
      toast({ description: t('claim_reward_success'), status: 'success' });
      navigateTo(PATH.REFERRAL_GIFTS);
    },
  });
};

export const useGetAffiliateRewardSetting = () => {
  return useQuery(
    [API_PATH.GET_AFFILIATE_REWARD_SETTING],
    getAffiliateRewardSetting
  );
};
