import React, { useState } from 'react';
import _ from 'lodash';
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
import { useTranslation } from 'next-i18next';

import { Favorite } from '../core/Common';

import { useGetMyFavoriteCards } from '@/queries/useCard';
import {
  Container,
  LoaderContainer,
  NoResultFound,
  Pagination,
  Text,
} from '@/components/Common';
import { FILTER_LIMIT } from '@/constants/filter';
import MyProfileLayout from '@/layouts/MyProfileLayout';
import { formatDate } from '@/utils/date';

const MyFavorites = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetMyFavoriteCards({
    page,
    limit: FILTER_LIMIT,
  });

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const renderContent = () => {
    const list = _.get(data, 'items', []);

    if (_.isEmpty(list)) {
      return <NoResultFound type="common" />;
    }

    return (
      <React.Fragment>
        <TableContainer
          borderColor="gray.200"
          borderRadius="md"
          sx={{ th: { color: 'gray.400' } }}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>{t('name')}</Th>
                <Th display={['none', 'none', 'table-cell']}>
                  {t('date_of_birth')}
                </Th>
                <Th display={['none', 'none', 'table-cell']}>{t('team')}</Th>
                <Th isNumeric>{t('action')}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {_.map(list, (item, index) => (
                <Box as="tr" key={index} my={4}>
                  <Td>
                    <Text fontWeight="bold">{_.get(item, 'name')}</Text>
                  </Td>
                  <Td display={['none', 'none', 'table-cell']}>
                    {formatDate(_.get(item, 'dob', ''))}
                  </Td>
                  <Td display={['none', 'none', 'table-cell']}>
                    {_.get(item, 'actualTeam.name')}
                  </Td>
                  <Td isNumeric>
                    <Favorite riderId={_.get(item, 'id', '')} />
                  </Td>
                </Box>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Pagination
          page={page}
          total={data?.total || 0}
          limit={FILTER_LIMIT}
          onChangePage={handleChangePage}
        />
      </React.Fragment>
    );
  };

  return (
    <MyProfileLayout>
      <Container pt={5}>
        <LoaderContainer isLoading={isLoading}>
          {renderContent()}
        </LoaderContainer>
      </Container>
    </MyProfileLayout>
  );
};

export default MyFavorites;
