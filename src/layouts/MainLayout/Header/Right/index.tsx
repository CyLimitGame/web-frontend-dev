import { Flex } from '@chakra-ui/react';
import React from 'react';

import { UserAvatar } from '@/features/core/Common';
import {
  Search,
  WalletButton,
  NotificationButton,
} from '@/features/core/Button';
import { SwitchLang } from '@/components/Common';

const Right = () => {
  return (
    <Flex gap={[2, 4]} alignItems="center" pos="relative">
      <Search />
      <WalletButton />
      <NotificationButton />
      <SwitchLang />
      <UserAvatar />
    </Flex>
  );
};

export default Right;
