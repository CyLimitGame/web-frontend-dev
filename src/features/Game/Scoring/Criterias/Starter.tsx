import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Icon,
  Collapse,
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

import { usePointData } from '../Components/usePointData';

import { fixedNumber } from '@/utils/common';
import { Text } from '@/components/Common';
import { MatrixRole } from '@/typings/game.enum';

type Props = {
  pcsRaceId: string;
};

const Starter = ({ pcsRaceId }: Props) => {
  const { t } = useTranslation();
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  const { matrixRole } = usePointData({
    pcsRaceId,
    matrixRole: MatrixRole.STARTER,
  });

  const roles = _.get(matrixRole, 'roles');
  const maxPoint = _.get(matrixRole, 'maxPoint', 0);

  if (!matrixRole?.isActive) {
    return null;
  }

  return (
    <Box>
      <Flex
        gap={4}
        onClick={onToggle}
        userSelect="none"
        cursor="pointer"
        alignItems="center"
        _hover={{ opacity: '0.5' }}
      >
        <Icon
          as={FaCaretDown}
          transform={isOpen ? 'rotate(180deg)' : 'rotate(0)'}
          transition="transform .2s"
        />
        <Text translateText="start_the_race" textTransform="initial" />
      </Flex>
      <Collapse in={isOpen}>
        <Box bg="input" borderRadius="xl" p={4} mb={4} mt={2}>
          <Box textTransform="initial" fontSize="sm">
            <Text translateText="if_the_rider_begins_the_race_points_are_given" />
          </Box>
          {!_.isEmpty(roles) && (
            <Box mt={4}>
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
                      <Td>{t('race_started')}</Td>
                      {_.map(roles, (role) => (
                        <Td key={role.name}>
                          {fixedNumber((role.value / 100) * maxPoint, 2)}
                        </Td>
                      ))}
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default Starter;
