import React from 'react';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { AuctionBid } from '@/typings/auction';
import { sortHistoriesPayment } from '@/utils/card';
import { UserNameField } from '@/features/core/Field';

type Props = {
  items: AuctionBid[];
};

const History = ({ items }: Props) => {
  const { t } = useTranslation();

  const data = sortHistoriesPayment(items) as AuctionBid[];

  return (
    <TableContainer
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      sx={{ th: { color: 'gray.400' } }}
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{t('user')}</Th>
            <Th>{t('bid_amount')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>
                <UserNameField user={item?.bidder} />
              </Td>
              <Td>${item.amount}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default History;
