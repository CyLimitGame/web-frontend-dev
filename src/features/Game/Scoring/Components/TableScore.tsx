import {
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import _ from 'lodash';
import { MdAdd } from 'react-icons/md';
import { useTranslation } from 'next-i18next';

import { Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';

type Props = {
  roles: string[];
  list: any;
};

const TableScore = ({ roles, list }: Props) => {
  const { t } = useTranslation();
  const [columns, setColumns] = useState(10);

  return (
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
            <Th>Stage rank</Th>
            {_.map(roles, (role) => (
              <Th key={role}>
                <Text translateText={role} />
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {_.map(_.take(list, columns), (elm: any, index) => (
            <Tr key={index}>
              <Td>{elm.label}</Td>
              {_.map(elm.roles, (value: any, key) => (
                <Td key={key}>{value.label}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      {_.size(list) > columns && (
        <Center mt={3}>
          <BaseButton
            leftIcon={<MdAdd />}
            onClick={() => setColumns((current) => current + 10)}
            size="sm"
          >
            {t('show_more')}
          </BaseButton>
        </Center>
      )}
    </TableContainer>
  );
};

export default TableScore;
