import React from 'react';
import { Box } from '@chakra-ui/react';

import TableScore from '../Components/TableScore';
import { usePointData } from '../Components/usePointData';

import { MatrixRole } from '@/typings/game.enum';
import { Text } from '@/components/Common';

type Props = {
  pcsRaceId: string;
};

const GeneralClassificationRankingOfRiderTeam = ({ pcsRaceId }: Props) => {
  const { roles, points } = usePointData({
    pcsRaceId,
    matrixRole: MatrixRole.GENERAL_CLASSIFICATION_RANKING_OF_RIDER_TEAM,
  });

  return (
    <Box>
      <Text
        textTransform="initial"
        fontSize="sm"
        mb={4}
        translateText="at_the_end_of_the_race_points_are_given_according_to_the_rider_team"
      />
      <TableScore roles={roles as string[]} list={points} />
    </Box>
  );
};

export default GeneralClassificationRankingOfRiderTeam;
