import React, { useEffect, useMemo, useState } from 'react';
import { Box, Divider, Stack } from '@chakra-ui/react';
import _ from 'lodash';

import ViewScore from './ViewScore';
import Starter from './Criterias/Starter';
import WinnerOfStage from './Criterias/WinnerOfStage';
import { usePointData } from './Components/usePointData';

import { LoaderContainer, Text } from '@/components/Common';
import { SelectInput } from '@/components/Inputs';
import { MatrixRole, Role } from '@/typings/game.enum';

const Scoring = () => {
  const [pcsRaceId, setPcsRaceId] = useState('');
  const {
    matrixRoles,
    isMultiRaces,
    races,
    isLoading,
    roles: roleRules,
  } = usePointData({
    pcsRaceId: pcsRaceId,
    matrixRole: MatrixRole.BEST_TEAMMATE_BONUS,
  });

  const data = _.filter(matrixRoles, (item) => {
    const role = _.get(item, 'role');
    const roles = _.filter(_.get(item, 'roles', []), (elm) =>
      _.includes(roleRules, elm.name)
    );

    if (!item.isActive) {
      return false;
    }

    if ([MatrixRole.STARTER, MatrixRole.WINNER_OF_STAGE].includes(role)) {
      return false;
    }

    if (role === MatrixRole.BEST_TEAMMATE_BONUS) {
      const findLeader = _.find(roles, (elm) => elm.name === Role.LEADER);
      return !!findLeader?.value;
    }

    if (role === MatrixRole.BEST_TEAMMATE_MALUS) {
      const findDomestic = _.find(roles, (elm) => elm.name === Role.DOMESTIC);
      return !!findDomestic?.value;
    }

    return true;
  });

  const startData = _.filter(data, (item: any) => item.isAcquired);
  const endData = _.filter(data, (item: any) => !item.isAcquired);

  const memoryRaces = useMemo(() => JSON.stringify(races), [races]);

  useEffect(() => {
    if (memoryRaces) {
      setPcsRaceId(_.get(races, `[0].id`, ''));
    }
  }, [memoryRaces, isMultiRaces]);

  return (
    <Stack spacing={4} fontSize={['sm', 'md']}>
      {isMultiRaces && (
        <Box maxW="320px">
          <SelectInput
            choices={races}
            name="race"
            label="race"
            value={pcsRaceId}
            onChange={(e) => setPcsRaceId(e.target.value)}
          />
        </Box>
      )}
      <LoaderContainer isLoading={isLoading}>
        <WinnerOfStage pcsRaceId={pcsRaceId} />
        <Box p={[2, 2, 4]} border="2px solid white" borderRadius="xl" mt={4}>
          <Box>
            <Text fontWeight="bold" translateText="in_race_score" mb={4} />
            <Starter pcsRaceId={pcsRaceId} />
            <Box pl={4}>
              <Text
                fontWeight="bold"
                mt={1}
                translateText="at_the_end_of_each_stage"
              />
              <Stack mt={4}>
                {_.map(startData, (item: any) => (
                  <ViewScore
                    item={item}
                    key={item.role}
                    pcsRaceId={pcsRaceId}
                  />
                ))}
              </Stack>
            </Box>
          </Box>
          <Divider my={4} borderStyle="dashed" />
          <Box>
            <Box pl={4}>
              <Text
                fontWeight="bold"
                mt={1}
                translateText="at_the_end_of_the_race"
              />
              <Stack mt={4}>
                {_.map(endData, (item: any) => (
                  <ViewScore
                    item={item}
                    key={item.role}
                    pcsRaceId={pcsRaceId}
                  />
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>
      </LoaderContainer>
    </Stack>
  );
};

export default Scoring;
