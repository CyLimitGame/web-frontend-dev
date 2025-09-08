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

const IntermediateSprintsPresence = ({ pcsRaceId }: Props) => {
  const { t } = useTranslation();
  const data = usePointData({
    pcsRaceId,
    matrixRole: MatrixRole.INTERMEDIATE_SPRINTS_PRESENCE,
  });

  const isGameComing = _.get(data, 'isGameComing');
  const isGameEnded = _.get(data, 'isGameEnded');
  const roles = _.get(data, 'matrixRole.roles', []);
  const attackKm = _.get(data, 'attackKm', false);
  const maxPoint = _.get(data, 'matrixRole.maxPoint', 0);

  const criteriasPoints = _.get(data, 'criteriasPoints');
  const findPoint = _.find(
    criteriasPoints,
    (item) => item.type === MatrixRole.INTERMEDIATE_SPRINTS_PRESENCE
  );
  const totalSprints = _.get(findPoint, 'points[0].totalSprints', 0);

  const isShowText = isGameComing || (!isGameEnded && !attackKm);

  return (
    <Box>
      {isShowText && (
        <Text
          textTransform="initial"
          fontSize="sm"
          translateText="the_criteria_intermediate_sprints_presence”"
        />
      )}
      {!isGameComing && attackKm && (
        <Text
          textTransform="initial"
          fontSize="sm"
          translateText="riders_dont_score_points_thanks_to"
        />
      )}
      {isGameEnded && !attackKm && (
        <Box>
          <Text
            textTransform="initial"
            fontSize="sm"
            translateText="our_data_provider_was_not_able_to_identify_the_number_of_kms_made_on_breakaway"
          />
          <TableContainer mt={4}>
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
                  <Th></Th>
                  {_.map(roles, (role) => (
                    <Th key={role.name}>
                      <Text translateText={role.name} />
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    {t(
                      'per_intermediate_sprints_crossed_in_the_classification'
                    )}
                  </Td>
                  {_.map(roles, (role) => (
                    <Td key={role.name}>
                      {totalSprints
                        ? fixedNumber(
                            ((role.value / 100) * maxPoint) / totalSprints,
                            2
                          )
                        : 0}
                    </Td>
                  ))}
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default IntermediateSprintsPresence;
