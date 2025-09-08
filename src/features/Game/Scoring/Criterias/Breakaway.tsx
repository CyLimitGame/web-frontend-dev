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

const Breakaway = ({ pcsRaceId }: Props) => {
  const { t } = useTranslation();
  const data = usePointData({ pcsRaceId, matrixRole: MatrixRole.BREAKAWAY });
  const isGameComing = _.get(data, 'isGameComing');
  const isGameEnded = _.get(data, 'isGameEnded');
  const roles = _.get(data, 'matrixRole.roles', []);
  const maxPoint = _.get(data, 'matrixRole.maxPoint', 0);
  const attackKm = _.get(data, 'attackKm', false);
  const totalKms = _.get(data, 'totalKms', 1);

  const isShowText = isGameComing || (!isGameEnded && !attackKm);

  return (
    <Box>
      {isShowText && (
        <Box mb={4}>
          <Text
            textTransform="initial"
            fontSize="sm"
            translateText="breakaway_criteria_is_only_used_if_breakaway_data"
          />
          <Text
            textTransform="initial"
            fontSize="sm"
            mb={4}
            translateText="if_breakaway_data_is_available"
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
                  <Td>{t('per_km')}</Td>
                  {_.map(roles, (role) => (
                    <Td key={role.name}>
                      {fixedNumber(
                        ((maxPoint / 0.1875) * (role.value / 100)) / totalKms,
                        2
                      )}
                    </Td>
                  ))}
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {isGameEnded && !attackKm && (
        <Text
          textTransform="initial"
          fontSize="sm"
          translateText="our_data_provider_was_not_able_to_identify"
        />
      )}
      {!isGameComing && attackKm && (
        <Box>
          <Text
            textTransform="initial"
            fontSize="sm"
            mb={4}
            translateText="for_each_km_ridden_in_a_breakaway_points_are_given"
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
                  <Td>{t('per_km')}</Td>
                  {_.map(roles, (role) => (
                    <Td key={role.name}>
                      {fixedNumber(
                        ((maxPoint / 0.1875) * (role.value / 100)) / totalKms,
                        2
                      )}
                    </Td>
                  ))}
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {isShowText && (
        <Box mt={4}>
          <Text
            textTransform="initial"
            fontSize="sm"
            translateText="intermediate_sprints_presence_more_a_rider"
          />
        </Box>
      )}
    </Box>
  );
};

export default Breakaway;
