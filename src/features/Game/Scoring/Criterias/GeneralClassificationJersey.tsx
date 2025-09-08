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

const GeneralClassificationJersey = ({ pcsRaceId }: Props) => {
  const { t } = useTranslation();
  const { matrixRole: data, stageNumber } = usePointData({
    pcsRaceId,
    matrixRole: MatrixRole.GENERAL_CLASSIFICATION_JERSEY,
  });
  const roles = _.get(data, 'roles', []);

  return (
    <Box>
      <Box textTransform="initial" fontSize="sm" mb={4}>
        <Text translateText="at_each_stage_points_are_given_to_the_rider" />
        <Text translateText="for_the_last_stage_the_points_are_multiplied" />
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
              <Td>{t('per_day_as_gen_leader')}</Td>
              {_.map(roles, (role) => (
                <Td key={role.name}>
                  {fixedNumber(
                    ((role?.value / 100) * data?.maxPoint) / (stageNumber + 1),
                    2
                  )}
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GeneralClassificationJersey;
