import React from 'react';

import { Box } from '@chakra-ui/react';

import TableScore from '../Components/TableScore';
import { usePointData } from '../Components/usePointData';

import { MatrixRole } from '@/typings/game.enum';
import { Text } from '@/components/Common';

type Props = {
  pcsRaceId: string;
};

const BetterStageRankingTeammate = ({ pcsRaceId }: Props) => {
  const { roles, points } = usePointData({
    pcsRaceId,
    matrixRole: MatrixRole.BETTER_STAGE_RANKING_TEAMMATE,
  });

  return (
    <Box>
      <Box textTransform="initial" fontSize="sm" mb={4}>
        <Text translateText="for_each_stage_points_are_given_according" />
        <Text translateText="if_the_rider_is_the_best_of_his_teammates" />
        <Text translateText="a_rider_has_to_start_the_stage_to_score_points_here" />
      </Box>
      <TableScore roles={roles as string[]} list={points} />
    </Box>
  );
};

export default BetterStageRankingTeammate;
