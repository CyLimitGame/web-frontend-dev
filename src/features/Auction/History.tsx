import React, { useState } from 'react';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { AuctionBid } from '@/typings/auction';
import { sortHistoriesPayment } from '@/utils/card';
import { Pagination } from '@/components/Common';
import { UserNameField } from '@/features/core/Field';

type Props = {
  items: AuctionBid[];
};

const LIMIT = 10;

const History = ({ items = [] }: Props) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const data = sortHistoriesPayment(items).splice(
    (page - 1) * LIMIT,
    LIMIT
  ) as AuctionBid[];

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <Box>
      <TableContainer
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        sx={{ th: { color: 'gray.400' } }}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize={['sm', 'md']}>{t('user')}</Th>
              <Th fontSize={['sm', 'md']}>{t('bid_amount')}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                <Td fontSize={['sm', 'md']}>
                  <UserNameField user={item?.bidder} />
                </Td>
                <Td fontSize={['sm', 'md']}>${item.amount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        page={page}
        total={items?.length}
        limit={LIMIT}
        onChangePage={handleChangePage}
      />
    </Box>
  );
};

export default History;
