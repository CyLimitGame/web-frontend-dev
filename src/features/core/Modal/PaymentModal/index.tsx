import React from 'react';
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  ModalProps,
  Box,
  Flex,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { BaseModal } from '@/components/Modal';
import { Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';

type Props = Omit<ModalProps, 'children'>;

const PaymentModal = (props: Props) => {
  const { t } = useTranslation();
  return (
    <BaseModal title="payment" closeable {...props}>
      <Tabs isFitted>
        <TabList>
          <Tab>Balance</Tab>
          <Tab>{t('credit_card')}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <Box>
              <Text fontSize="2xl" fontWeight="bold" mt={2} textAlign="center">
                $ 21.68
              </Text>
              <BaseButton w="100%" variant="light" mt={3}>
                Bid
              </BaseButton>
              <Text fontSize="sm" color="gray.400" mt={4}>
                You bid on
              </Text>
              <Text>Nuno tavares</Text>
              <Text fontSize="sm" color="gray.400" mt={4}>
                Balance
              </Text>
              <Text>$291</Text>
            </Box>
          </TabPanel>
          <TabPanel p={0}>
            <Box>
              <Text fontSize="2xl" fontWeight="bold" mt={2} textAlign="center">
                $ 21.68
              </Text>
              <Flex justifyContent="space-between" fontSize="sm">
                <Text>Payment method</Text>
                <Text color="error.500">Select / add a credit card</Text>
              </Flex>
              <BaseButton w="100%" variant="light" mt={2}>
                Bid
              </BaseButton>
              <Text fontSize="sm" color="gray.400" mt={4}>
                You bid on
              </Text>
              <Text>Nuno tavares</Text>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BaseModal>
  );
};

export default PaymentModal;
