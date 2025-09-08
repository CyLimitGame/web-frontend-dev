import React from 'react';
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  ModalProps,
} from '@chakra-ui/react';
import Icon from '@chakra-ui/icon';
import { Box } from '@chakra-ui/layout';

import { BaseModal } from '@/components/Modal';
import { WalletIcon } from '@/icons';
import { Text } from '@/components/Common';
import AddFund from '@/features/AddFund';
import Withdraw from '@/features/Withdraw';
import { useGetUserProfile } from '@/queries/useUser';

type Props = Omit<ModalProps, 'children'>;

const WalletModal = (props: Props) => {
  const { onClose } = props;

  const { data } = useGetUserProfile();

  return (
    <BaseModal title="wallet" closeable isUseDrawerForMobile {...props}>
      <Box textAlign="center">
        <Icon
          as={WalletIcon}
          w={['50px', '50px', '80px']}
          h={['50px', '50px', '80px']}
        />
        <Text translateText="total_balance" color="gray.400" mt="4" />
        <Text fontSize={['3xl', '3xl', '5xl']} fontWeight="bold">
          ${data?.totalBalance?.toFixed(2)}
        </Text>
      </Box>

      <Tabs isFitted>
        <TabList mb="1em">
          <Tab>
            <Text translateText="add_fund" />
          </Tab>
          <Tab>
            <Text translateText="withdraw" />
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <AddFund onToggleRamp={onClose} onCloseModal={onClose} />
          </TabPanel>
          <TabPanel p={0}>
            <Withdraw />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BaseModal>
  );
};

export default WalletModal;
