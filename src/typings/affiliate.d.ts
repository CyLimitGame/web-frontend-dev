import { AffiliateRewardStatusEnum, RewardTypeEnum } from './affiliate.enum';
import { CardItem } from './card';
import { User } from './user';

export type TakeReferredReward = {
  friendId: string;
  rewardType: RewardTypeEnum;
};

export type AffiliateReward = {
  userId: string;
  friendId: string;
  rewardType: RewardTypeEnum;
  status: AffiliateRewardStatusEnum;
  rewardNfts: CardItem[];
  rewardXP: number;
  friend: User;
  id: string;
};

export type ClaimReward = {
  rewardId: string;
  nftId?: string;
};

export type NftsPurchased = {
  reward: {
    status: AffiliateRewardStatusEnum;
  };
  count: number;
};

export type ReferredReward = {
  createdAt: string;
  firstName: string;
  id: string;
  lastName: string;
  nftsPurchased: NftsPurchased;
};
