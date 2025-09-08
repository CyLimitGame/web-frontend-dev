import React from 'react';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';

import CoverBackground from './CoverBackground';
import ProfileInfo from './ProfileInfo';
import UserTabs from './UserTabs';

import { Container } from '@/components/Common';
import MainLayout from '@/layouts/MainLayout';

type Props = {
  children: React.ReactElement;
};

const UserLayout = ({ children }: Props) => {
  return (
    <MainLayout>
      <CoverBackground />
      <Container pb={10}>
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          <GridItem colSpan={1} display={['none', 'none', 'none', 'grid']}>
            <Box
              bg="white"
              borderRadius="md"
              shadow="md"
              mt={-20}
              zIndex="docked"
              p={4}
            >
              <ProfileInfo />
            </Box>
          </GridItem>
          <GridItem colSpan={[4, 4, 4, 3]}>
            <Box
              position="relative"
              mt="-80px"
              display={['block', 'block', 'block', 'none']}
            >
              <Flex justifyContent="center">
                <Flex maxW="260px" flexDirection="column" alignItems="center">
                  <ProfileInfo />
                </Flex>
              </Flex>
            </Box>
            <UserTabs />
            {children}
          </GridItem>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default UserLayout;
