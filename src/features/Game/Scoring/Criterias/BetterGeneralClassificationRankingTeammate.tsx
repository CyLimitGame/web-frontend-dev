import React from 'react';
import { Box } from '@chakra-ui/react';

import TableScore from '../Components/TableScore';
import { usePointData } from '../Components/usePointData';

import { MatrixRole } from '@/typings/game.enum';
import { Text } from '@/components/Common';

type Props = {
  pcsRaceId: string;
};

const BetterGeneralClassificationRankingTeammate = ({ pcsRaceId }: Props) => {
  const { roles, points } = usePointData({
    pcsRaceId,
    matrixRole: MatrixRole.BETTER_GENERAL_CLASSIFICATION_RANKING_TEAMMATE,
  });

  return (
    <Box>
      <Box textTransform="initial" fontSize="sm" mb={4}>
        <Text translateText="at_the_end_of_the_race_points_are_given_according" />
        <Text translateText="if_the_rider_is_the_best_of_his_teammates" />
        <Text translateText="if_a_rider_did_not_start_all_the_stages" />
      </Box>
      <TableScore roles={roles as string[]} list={points} />
    </Box>
  );
};

export default BetterGeneralClassificationRankingTeammate;
