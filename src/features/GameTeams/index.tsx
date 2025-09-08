import React from 'react';

import { TeamCreated } from '@/features/core/Common';
import { MainLayout } from '@/layouts';
import useParamsQuery from '@/hooks/useGetParams';

const GameTeams = () => {
  const { getParam } = useParamsQuery();
  const gameId = getParam('id');
  return (
    <MainLayout>
      <TeamCreated gameId={gameId} />
    </MainLayout>
  );
};

export default GameTeams;
