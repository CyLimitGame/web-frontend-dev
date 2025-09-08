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

const BestTeammateBonus = ({ pcsRaceId }: Props) => {
  const { t } = useTranslation();
  const { matrixRole: data } = usePointData({
    pcsRaceId,
    matrixRole: MatrixRole.BEST_TEAMMATE_BONUS,
  });
  const roles = _.get(data, 'roles');

  return (
    <Box>
      <Text
        textTransform="initial"
        fontSize="sm"
        mb={4}
        translateText="at_the_end_of_the_race_bonus_is_given"
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
              <Td>{t('bonus')}</Td>
              {_.map(roles, (role) => (
                <Td key={role.name}>
                  {fixedNumber((role?.value / 100) * data?.maxPoint, 2)}
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BestTeammateBonus;
