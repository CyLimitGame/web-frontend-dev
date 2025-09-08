import React, { useState } from 'react';
import { Flex, Avatar, Box, Icon } from '@chakra-ui/react';
import { ImFilesEmpty } from 'react-icons/im';

import MyProfileLayout from '@/layouts/MyProfileLayout';
import { Pagination, TextOneLine, Text, DataGrid } from '@/components/Common';
import { useGetReferrals } from '@/queries/useUser';
import { UserReferral } from '@/typings/user';
import { getFullName } from '@/utils/user';

type UserProps = {
  data: UserReferral;
};

const User = ({ data }: UserProps) => {
  return (
    <Flex alignItems="center">
      <Avatar mr={4} src={data.avatarUrl} />
      <TextOneLine value={getFullName(data)} maxW="200px" />
    </Flex>
  );
};

const NoResult = () => {
  return (
    <Flex alignItems="center" flexDirection="column" maxW="280px" margin="auto">
      <Icon as={ImFilesEmpty} fontSize="70px" color="gray.400" />
      <Text
        mt={4}
        color="gray.400"
        textAlign="center"
        fontWeight="bold"
        translateText="you_do_not_have_any_referals_yet"
      />
      <Text
        mt={2}
        color="gray.400"
        textAlign="center"
        translateText="feel_free_to_invite_your_friends_via"
      />
    </Flex>
  );
};

const Referrals = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetReferrals({ limit: 12, page });

  const handleChangePage = (pageValue: number) => {
    setPage(pageValue);
  };

  return (
    <MyProfileLayout>
      <Box pt={10}>
        <DataGrid
          gap={[2, 4, 4]}
          columns={[2, 2, 3]}
          data={data?.items || []}
          isLoading={isLoading}
          notFoundItems={<NoResult />}
          renderItem={(item) => <User data={item} />}
        />
        <Pagination
          page={page}
          total={data?.total || 0}
          limit={12}
          onChangePage={handleChangePage}
        />
      </Box>
    </MyProfileLayout>
  );
};

export default Referrals;
