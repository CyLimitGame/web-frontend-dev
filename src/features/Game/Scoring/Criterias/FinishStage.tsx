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

import { Text } from '@/components/Common';
import { fixedNumber } from '@/utils/common';
import { MatrixRole } from '@/typings/game.enum';

type Props = {
  pcsRaceId: string;
};

const FinishStage = ({ pcsRaceId }: Props) => {
  const { t } = useTranslation();
  const { matrixRole: data, stageNumber } = usePointData({
    pcsRaceId,
    matrixRole: MatrixRole.FINISH_STAGE,
  });

  const roles = _.get(data, 'roles', []);

  return (
    <Box>
      <Text
        textTransform="initial"
        fontSize="sm"
        mb={4}
        translateText="for_each_stage_points_are_given_if_the_rider_finishes_the_stage"
      />
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
              <Td>{t('per_stage')}</Td>
              {_.map(roles, (role) => (
                <Td key={role.name}>
                  {fixedNumber(
                    ((role?.value / 100) * data?.maxPoint) / stageNumber,
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

export default FinishStage;
