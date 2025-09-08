import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useTranslation } from 'next-i18next';

import { usePointData } from '../Components/usePointData';

import { fixedNumber } from '@/utils/common';
import { Text } from '@/components/Common';
import { MatrixRole } from '@/typings/game.enum';

type Props = {
  pcsRaceId: string;
};

const WinnerOfStage = ({ pcsRaceId }: Props) => {
  const { t } = useTranslation();
  const { matrixRole, scoreByWinnerOfStageRules, gameMode } = usePointData({
    pcsRaceId,
    matrixRole: MatrixRole.WINNER_OF_STAGE,
  });

  const roles = _.get(matrixRole, 'roles');

  const firstStagePoint = _.get(scoreByWinnerOfStageRules, 'firstStagePoint');
  const specificStagePoints = _.get(
    scoreByWinnerOfStageRules,
    'specificStagePoints'
  );

  const othersStagePoint = _.get(scoreByWinnerOfStageRules, 'othersStagePoint');

  const data = [
    {
      value: firstStagePoint,
      id: 1,
      label: '1',
    },
    ..._.map(specificStagePoints, (elm) => ({
      ...elm,
      label: elm.id,
    })),
    {
      value: othersStagePoint,
      id: Number(_.get(_.last(specificStagePoints), 'id', 0)) + 1,
      label: `${Number(_.get(_.last(specificStagePoints), 'id', 0)) + 1}+`,
    },
  ];

  const convertData = _.reduce(
    data,
    (acc: any, obj: any) => {
      const lastValue = _.get(_.last(acc), 'value', 0);
      acc.push({ ...obj, value: lastValue + obj.value });
      return acc;
    },
    []
  );

  if (_.isEmpty(roles) || gameMode === 'global' || !matrixRole?.isActive) {
    return null;
  }

  return (
    <Box p={[2, 2, 4]} border="2px solid white" borderRadius="xl">
      <Box textTransform="initial" fontSize="sm" mb={4}>
        <Text translateText="the_score_of_the_rider_is_represented_by_in_race_score" />
        <Text translateText="in_access_mode_if_a_rider_won_stages_during_the_race" />
      </Box>
      <TableContainer>
        <Table
          sx={{
            'th, td': {
              border: '1px solid white',
              color: 'white',
              fontWeight: 'bold',
            },
          }}
        >
          <Thead>
            <Tr>
              <Th>{t('stages_won')}</Th>
              {_.map(roles, (role) => (
                <Th key={role.name}>
                  <Text>{t('min_score')}</Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {_.map(convertData, (elm, index) => (
              <Tr key={index}>
                <Td>{elm.label}</Td>
                {_.map(roles, (role) => (
                  <Td key={role.name}>
                    {fixedNumber((role.value / 100) * elm.value, 2)}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WinnerOfStage;
