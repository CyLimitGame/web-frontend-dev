import React from 'react';

import { MainLayout } from '@/layouts';
import { TeamCreated } from '@/features/core/Common';
import useParamsQuery from '@/hooks/useGetParams';

const WatchTeams = () => {
  const { getParam } = useParamsQuery();
  const gameId = getParam('id');
  return (
    <MainLayout>
      <TeamCreated isOnlyShow={true} gameId={gameId} />
    </MainLayout>
  );
};

export default WatchTeams;
