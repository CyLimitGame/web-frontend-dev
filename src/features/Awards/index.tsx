import React from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { Stack } from '@chakra-ui/react';

import LevelProgressBarWithBottle from '../core/Common/LevelProgressBar/LevelProgressBarWithBottle';

import AwardsTabs, { TabName } from './AwardsTabs';
import UnderstandingRules from './UnderstandingRules';
import ProgressionRules from './ProgressionRules';

import MyProfileLayout from '@/layouts/MyProfileLayout';
import { useGetUserProfile } from '@/queries/useUser';

const Awards = () => {
  const { data: user } = useGetUserProfile();
  const router = useRouter();
  const tab = _.get(router.query, 'tab', TabName.UNDERSTANDING_RULES);

  const totalBidonToNextLevel = _.get(user, 'totalBidonToNextLevel', 0);
  const level = _.get(user, 'level', 0);
  const totalBidon = _.get(user, 'totalBidon', 0);

  return (
    <MyProfileLayout>
      <>
        <LevelProgressBarWithBottle
          value={totalBidon}
          total={totalBidonToNextLevel + totalBidon}
          level={level}
          my={5}
        />
        <Stack py={4} spacing={2} flex={1}>
          <AwardsTabs />
          {tab === TabName.UNDERSTANDING_RULES && <UnderstandingRules />}
          {tab === TabName.FRIENDS_PROGRESSION && <ProgressionRules />}
          {tab === TabName.FANTASY_GAME_PROGRESSION && <ProgressionRules />}
          {tab === TabName.COLLECTIBLE_PROGRESSION && <ProgressionRules />}
        </Stack>
      </>
    </MyProfileLayout>
  );
};

export default Awards;
