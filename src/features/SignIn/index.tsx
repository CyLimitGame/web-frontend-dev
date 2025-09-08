import {
  Box,
  Center,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'next-i18next';

import SignIn from './SignIn';
import Register from './Register';

import { CylimitLogo, SwitchLang } from '@/components/Common';
import useSetInviteCode from '@/hooks/useSetInviteCode';
import { AuthLayout } from '@/layouts';

const Auth = () => {
  useSetInviteCode();
  const { t } = useTranslation();
  const [isLessThan768] = useMediaQuery('(max-width: 768px)');

  return (
    <AuthLayout>
      <Box fontStyle="italic">
        <Box pos="fixed" right={2} top={2}>
          <SwitchLang />
        </Box>
        <Center>
          <CylimitLogo />
        </Center>
        {isLessThan768 ? (
          <Tabs align="center">
            <TabList display="inline-flex">
              <Tab>{t('login')}</Tab>
              <Tab>{t('register')}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SignIn />
              </TabPanel>
              <TabPanel>
                <Register />
              </TabPanel>
            </TabPanels>
          </Tabs>
        ) : (
          <Flex gap={4} mt={5}>
            <Box flex={1}>
              <SignIn />
            </Box>
            <Box flex={1}>
              <Register />
            </Box>
          </Flex>
        )}
      </Box>
    </AuthLayout>
  );
};

export default Auth;
