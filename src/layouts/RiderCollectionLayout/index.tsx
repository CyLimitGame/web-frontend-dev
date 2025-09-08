import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

import RiderCollectionTabs from './RiderCollectionTabs';

import MainLayout from '@/layouts/MainLayout';
import { Container } from '@/components/Common';

type Props = {
  name?: string;
  isHiddenChild?: boolean;
  children: React.ReactNode;
};

const RiderCollectionLayout = ({ name, children, isHiddenChild }: Props) => {
  return (
    <MainLayout>
      <Container pt={4} pb={10}>
        <Flex
          flexDirection={[
            'column-reverse',
            'column-reverse',
            'column-reverse',
            'row',
          ]}
          justifyContent="space-between"
        >
          <Text fontWeight="bold" fontSize={['md', 'xl', '3xxl']}>
            {name}
          </Text>
          <RiderCollectionTabs />
        </Flex>
        {isHiddenChild ? null : children}
      </Container>
    </MainLayout>
  );
};

export default RiderCollectionLayout;
