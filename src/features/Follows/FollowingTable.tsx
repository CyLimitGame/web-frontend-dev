import {
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableContainer,
  Flex,
} from '@chakra-ui/react';
import _ from 'lodash';

import UserName from '../core/Field/UserName';

import UnfollowButton from '@/layouts/UserLayout/ProfileInfo/UnfollowButton';
import { useGetFollowings } from '@/queries/useUser';
import { Loader, NoResultFound } from '@/components/Common';

const FollowingsTable = () => {
  const { data: followings, isLoading } = useGetFollowings();

  if (isLoading) {
    return (
      <Flex justifyContent="center" py={10}>
        <Loader />
      </Flex>
    );
  }

  if (_.isEmpty(followings)) {
    return <NoResultFound type="common" />;
  }
  return (
    <TableContainer
      borderColor="gray.200"
      borderRadius="md"
      sx={{ th: { color: 'gray.400' } }}
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th></Th>
            <Th isNumeric></Th>
          </Tr>
        </Thead>
        <Tbody>
          {_.map(followings, (following) => (
            <Box as="tr" key={following._id} my={4}>
              <Td>
                <UserName user={{ id: following._id, ...following }} />
              </Td>
              <Td isNumeric>
                <UnfollowButton id={following._id} />
              </Td>
            </Box>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default FollowingsTable;
