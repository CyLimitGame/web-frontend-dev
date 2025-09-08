import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import _ from 'lodash';

import SelectReward from './SelectReward';
import NftRewards from './NftRewards';
import XpReward from './XpReward';

import MyProfileLayout from '@/layouts/MyProfileLayout';
import {
  AffiliateRewardStatusEnum,
  RewardTypeEnum,
} from '@/typings/affiliate.enum';
import useParamsQuery from '@/hooks/useGetParams';
import { useGetDetailReferredReward } from '@/queries/useAffiliate';
import { Loader } from '@/components/Common';
import { useGetUserProfile } from '@/queries/useUser';

const AffiliateTakeReward = () => {
  const { data: userProfile } = useGetUserProfile();
  const { getParam } = useParamsQuery();
  const id = getParam('id');

  const { data, isLoading } = useGetDetailReferredReward(id, userProfile?.id);
  const status = _.get(data, 'status');
  const rewardNfts = _.get(data, 'rewardNfts');
  const rewardType = _.get(data, 'rewardType');

  return (
    <MyProfileLayout>
      <Box py={5}>
        {isLoading && (
          <Flex justifyContent="center">
            <Loader />
          </Flex>
        )}
        {!isLoading &&
          (!status || status === AffiliateRewardStatusEnum.FAILED) && (
            <SelectReward />
          )}
        {!isLoading &&
          status === AffiliateRewardStatusEnum.WAITING &&
          rewardType === RewardTypeEnum.NFT &&
          !_.isEmpty(rewardNfts) && <NftRewards data={data} />}
        {!isLoading &&
          rewardType === RewardTypeEnum.XP &&
          status === AffiliateRewardStatusEnum.WAITING && (
            <XpReward data={data} />
          )}
      </Box>
    </MyProfileLayout>
  );
};

export default AffiliateTakeReward;
