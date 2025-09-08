import React from 'react';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { MdOutlineWarning } from 'react-icons/md';

import TableScore from '../Components/TableScore';
import { usePointData } from '../Components/usePointData';

import { MatrixRole } from '@/typings/game.enum';
import { Text } from '@/components/Common';

type Props = {
  pcsRaceId: string;
};

const Points = ({ pcsRaceId }: Props) => {
  const { roles, points } = usePointData({
    pcsRaceId,
    matrixRole: MatrixRole.POINTS,
  });

  return (
    <Box>
      <Box textTransform="initial" fontSize="sm" mb={4}>
        <Text translateText="at_the_end_of_the_race_points_are_given_according_to_the_rider_points_sprint" />
        <Flex gap={2} alignItems="center">
          <Icon as={MdOutlineWarning} />
          <Text translateText="to_make_this_ranking_even_points_scored_from_riders" />
        </Flex>
      </Box>
      <TableScore roles={roles as string[]} list={points} />
    </Box>
  );
};

export default Points;
