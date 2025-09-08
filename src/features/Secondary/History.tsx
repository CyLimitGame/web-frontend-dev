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
  Tooltip,
  Icon,
  Flex,
  Stack,
} from '@chakra-ui/react';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';

import { MdInfoOutline } from 'react-icons/md';

import { SaleHistoryItem } from '@/typings/card';
import { formatDateTime } from '@/utils/date';
import { MAP_TEXT_MARKET_TYPE } from '@/constants/market';
import { Pagination, Text } from '@/components/Common';
import { UserNameField } from '@/features/core/Field';

type Props = {
  items: SaleHistoryItem[];
};

const LIMIT = 10;

const History = ({ items }: Props) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const data = _.orderBy(items, (item) => new Date(item.createdAt), [
    'desc',
  ]).splice((page - 1) * LIMIT, LIMIT);

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
              <Th fontSize={['xs', 'md']} p={[2, 2, 4]}>
                {t('event')}
              </Th>
              <Th
                fontSize={['xs', 'md']}
                p={[2, 2, 4]}
                display={['none', 'none', 'block']}
              >
                {t('from_user')}
              </Th>
              <Th fontSize={['xs', 'md']} p={[2, 2, 4]}>
                {t('to_user')}
              </Th>
              <Th fontSize={['xs', 'md']} p={[2, 2, 4]}>
                {t('price')}
              </Th>
              <Th
                fontSize={['xs', 'md']}
                p={[2, 2, 4]}
                display={['none', 'none', 'block']}
              >
                {t('date')}
              </Th>
              <Th display={['block', 'block', 'none']}>&nbsp;</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item) => (
              <Tr key={item.id}>
                <Td fontSize={['xs', 'md']} p={[2, 2, 4]}>
                  {MAP_TEXT_MARKET_TYPE[item?.marketType]}
                </Td>
                <Td
                  fontSize={['xs', 'md']}
                  p={[2, 2, 4]}
                  display={['none', 'none', 'block']}
                >
                  <UserNameField user={item?.fromUser} />
                </Td>
                <Td fontSize={['xs', 'md']} p={[2, 2, 4]}>
                  <UserNameField user={item?.toUser} />
                </Td>
                <Td fontSize={['xs', 'md']} p={[2, 2, 4]}>
                  {item.amount ? `$${item.amount}` : '-'}
                </Td>
                <Td
                  fontSize={['xs', 'md']}
                  p={[2, 2, 4]}
                  display={['none', 'none', 'block']}
                >
                  {formatDateTime(item.createdAt)}
                </Td>
                <Td display={['table-cell', 'table-cell', 'none']}>
                  <Tooltip
                    label={
                      <Stack spacing={1}>
                        <Flex>
                          <Text w="100px">{t('event')}:</Text>
                          <Text>{MAP_TEXT_MARKET_TYPE[item?.marketType]}</Text>
                        </Flex>
                        <Flex>
                          <Text w="100px">{t('from_user')}:</Text>
                          <UserNameField user={item?.fromUser} />
                        </Flex>
                        <Flex>
                          <Text w="100px">{t('to_user')}:</Text>
                          <UserNameField user={item?.toUser} />
                        </Flex>
                        <Flex>
                          <Text w="100px">{t('price')}:</Text>
                          <Text> {item.amount ? `$${item.amount}` : '-'}</Text>
                        </Flex>
                        <Flex>
                          <Text w="100px">{t('date')}:</Text>
                          <Text>{formatDateTime(item.createdAt)}</Text>
                        </Flex>
                      </Stack>
                    }
                  >
                    <Box pr={4}>
                      <Icon as={MdInfoOutline} />
                    </Box>
                  </Tooltip>
                </Td>
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
