import React from 'react';
import LazyLoad from 'react-lazyload';
import {
  Box,
  Flex,
  Image,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';

import { useGetTemplateRule } from '@/queries/useGame';
import { Text } from '@/components/Common';
import { formatDate, formatDateTime } from '@/utils/date';

const RaceInfomation = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;

  const { data } = useGetTemplateRule(id as string);

  const imageUrl = _.get(data, 'imageUrl');
  const name = _.get(data, 'name');
  const startDate = _.get(data, 'startDate', '');
  const endDate = _.get(data, 'endDate', '');
  const races = _.get(data, 'races', '');

  return (
    <Box>
      <Flex gap={5} direction={['column', 'column', 'column', 'row']}>
        <LazyLoad>
          <Image src={imageUrl} maxW="100%" w="320px" borderRadius="lg" />
        </LazyLoad>
        <Stack fontSize="lg">
          <Flex>
            <Text w="120px" fontWeight="bold" color="gray.600">
              {t('name')}:
            </Text>
            <Text>{name}</Text>
          </Flex>
          <Flex>
            <Text w="120px" fontWeight="bold" color="gray.600">
              {t('start_date')}:
            </Text>
            <Text>{formatDateTime(startDate as string)}</Text>
          </Flex>
          <Flex>
            <Text w="120px" fontWeight="bold" color="gray.600">
              {t('end_date')}:
            </Text>
            <Text>{formatDateTime(endDate as string)}</Text>
          </Flex>
        </Stack>
      </Flex>
      {!_.isEmpty(races) && (
        <Box mt={5}>
          <Text fontSize="xl" fontWeight="bold" translateText="list_of_races" />
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th fontSize={['sm', 'md']}>{t('no')}</Th>
                  <Th fontSize={['sm', 'md']}>{t('name')}</Th>
                  <Th fontSize={['sm', 'md']}>{t('start_date')}</Th>
                  <Th fontSize={['sm', 'md']}>{t('end_date')}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {_.map(races, (item, index) => {
                  const name = _.get(item, 'race.name');
                  const startDate = _.get(item, 'race.date_start', '');
                  const endDate = _.get(item, 'race.date_end', '');
                  return (
                    <Tr key={index}>
                      <Td fontSize={['sm', 'md']}>{index + 1}</Td>
                      <Td fontSize={['sm', 'md']}>{name}</Td>
                      <Td fontSize={['sm', 'md']}>{formatDate(startDate)}</Td>
                      <Td fontSize={['sm', 'md']}>{formatDate(endDate)}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default RaceInfomation;
