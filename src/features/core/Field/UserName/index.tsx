import React from 'react';
import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import Image from 'next/image';

import { Text } from '@/components/Common';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import { useGetUserProfile } from '@/queries/useUser';
import { getFullName } from '@/utils/user';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
};

type Props = {
  user: Partial<User>;
};

const UserName = ({ user }: Props) => {
  const avatarUrl = _.get(user, 'avatarUrl', '');
  const id = _.get(user, 'id', '');

  const { data: userInfo } = useGetUserProfile();

  const handleNavigateDetailUser = () => {
    const path = userInfo?.id === id ? PATH.MY_TEAM : `${PATH.USER}/${id}`;
    navigateTo(path);
  };

  return (
    <Flex
      alignItems="center"
      display="inline-flex"
      cursor="pointer"
      onClick={handleNavigateDetailUser}
      _hover={{ color: 'primary.500' }}
      gap={2}
    >
      <Image
        src={avatarUrl}
        width="26px"
        height="26px"
        style={{ borderRadius: '50%' }}
        unoptimized
      />
      <Text>{getFullName(user)}</Text>
    </Flex>
  );
};

export default UserName;
