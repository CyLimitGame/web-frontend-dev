import React from 'react';

import RewardsCard from './RewardsCard';

import { MainLayout } from '@/layouts';
import { Breadcrumbs, Container, DataGrid, Text } from '@/components/Common';
import { RewardsItem } from '@/typings/rewards';
import { REWARDS_BREADCRUMB } from '@/constants/breadcrumbs';

// TODO: Mock will remove when implement API
const REWARDS: RewardsItem[] = [
  {
    id: '1',
    rank: 1,
    rankLabel: '1st place',
    items: {
      wolrd_tour: 1,
      pro_team: 1,
    },
  },
  {
    id: '2',
    rank: 2,
    rankLabel: '2nd place',
    items: {
      wolrd_tour: 1,
    },
  },
  {
    id: '3',
    rank: 3,
    rankLabel: '3rd place',
    items: {
      conti: 2,
    },
  },
  {
    id: '4',
    point: '4 - 10',
    items: {
      rare: 2,
    },
  },
  {
    id: '5',
    point: '11 - 1000',
    items: {
      rare: 1,
    },
  },
  {
    id: '6',
    point: '101 - 10%',
    items: {
      common: 1,
    },
  },
  {
    id: '7',
    point: '10% - 50%',
    items: {
      common: 2,
    },
  },
  {
    id: '8',
    point: '50% - 100%',
    items: {
      common: 1,
    },
  },
];

const Rewards = () => {
  return (
    <MainLayout>
      <Container maxWidth={1200} pt={5} pb={10}>
        <Breadcrumbs data={REWARDS_BREADCRUMB} />
        <Text
          translateText="rewards"
          fontWeight="bold"
          fontSize="4xl"
          color="gray.900"
          mt={2}
          mb={10}
        />
        <DataGrid
          data={REWARDS}
          columns={3}
          gap={6}
          renderItem={(item) => <RewardsCard item={item} />}
        />
      </Container>
    </MainLayout>
  );
};

export default Rewards;
