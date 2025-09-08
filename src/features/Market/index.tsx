import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import _get from 'lodash/get';

import LevelProgressBarWithBottle from '../core/Common/LevelProgressBar/LevelProgressBarWithBottle';

import NextRaces from './components/NextRaces';
import LastAuctions from './components/LastAuctions';

import MyTeamInProgress from './components/MyTeamInProgress';

import { Container, JerseyWithSponsor } from '@/components/Common';
import { useListenPayment } from '@/queries/usePayment';
import { useGetUserProfile } from '@/queries/useUser';
import { getFullName, getUserBackGround } from '@/utils/user';
import { Jersey, Sponsor } from '@/typings/user.enum';

const Market = () => {
  const { data: user } = useGetUserProfile();
  const primaryColor = user?.primaryColor || '#ffffff';
  const secondaryColor = user?.secondaryColor || '#ffffff';
  useListenPayment({});
  const totalBidonToNextLevel = _get(user, 'totalBidonToNextLevel', 0);
  const level = _get(user, 'level', 0);
  const totalBidon = _get(user, 'totalBidon', 0);

  return (
    <Container pb="24px" overflow="hidden">
      <Flex
        alignItems="center"
        gap="16px"
        py={['10px', '10px', '16px']}
        pl={['10px', '20px', '46px']}
        background={getUserBackGround(user, { to: 85.5 })}
      >
        <Text fontSize={[20, 20, 28]}> {getFullName(user)}</Text>
        {!!user && (
          <JerseyWithSponsor
            jersey={user?.jersey as Jersey}
            sponsor={user?.sponsor as Sponsor}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            width="50"
            height="50"
          />
        )}
      </Flex>
      <LevelProgressBarWithBottle
        value={totalBidon}
        total={totalBidonToNextLevel + totalBidon}
        level={level}
        my="38px"
        maxW="1000px"
      />
      <Flex
        mb="24px"
        gap="24px"
        flexDirection={['column', 'column', 'column', 'column', 'row']}
        sx={{
          '& > div': {
            flex: 1,
          },
        }}
      >
        <NextRaces />
        <LastAuctions />
      </Flex>
      <MyTeamInProgress />
    </Container>
  );
};

export default Market;
