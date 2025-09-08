import React from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import Image from 'next/image';

import Aside from './Aside';
import MyTeamTabs from './MyTeamTabs';

import MainLayout from '@/layouts/MainLayout';
import { Container } from '@/components/Common';
import { NEXT_PUBLIC_BANNER_MY_TEAM } from '@/config/appConfig';

type Props = {
  renderAsideContent?: () => React.ReactNode;
  children: React.ReactNode;
};

const MyTeamLayout = ({ renderAsideContent, children }: Props) => {
  return (
    <MainLayout>
      <Box
        display={['none', 'none', 'none', 'block']}
        height="400px"
        pos="relative"
        maxW="1440px"
        mx="auto"
        bg="gray.200"
      >
        <Image src={NEXT_PUBLIC_BANNER_MY_TEAM} layout="fill" />
      </Box>
      <Container pb={10}>
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          <Aside renderAsideContent={renderAsideContent} />
          <GridItem colSpan={[4, 4, 4, 3]} pt={4}>
            <MyTeamTabs />
            {children}
          </GridItem>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default MyTeamLayout;
