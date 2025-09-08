import React, { createContext, useCallback, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import _ from 'lodash';

import MyProfileTabs from './MyProfileTabs';
import ProfileInfo from './ProfileInfo';

import { Container } from '@/components/Common';
import MainLayout from '@/layouts/MainLayout';
import { useGetUserProfile } from '@/queries/useUser';
import { getUserBackGround } from '@/utils/user';
import { ClaimFreeCardsButton } from '@/features/core/Button';

export type MyProfileContextType = {
  primaryColor: string;
  secondaryColor: string;
  changeColor: (primaryColor: string, secondaryColor: string) => void;
};

export const MyProfileContext = createContext<MyProfileContextType>({
  secondaryColor: '',
  primaryColor: '',
  changeColor: _.noop,
});

type Props = {
  children: React.ReactElement;
};

const MyProfileLayout = ({ children }: Props) => {
  const { data } = useGetUserProfile();
  const [colorEditing, setColorEditing] = useState({
    secondaryColor: '',
    primaryColor: '',
  });

  const primaryColor = colorEditing.primaryColor || data?.primaryColor;
  const secondaryColor = colorEditing.secondaryColor || data?.secondaryColor;

  const changeColor = useCallback(
    (primaryColor: string, secondaryColor: string) => {
      setColorEditing({ primaryColor, secondaryColor });
    },
    []
  );

  return (
    <MainLayout>
      <MyProfileContext.Provider
        value={{
          ...colorEditing,
          changeColor,
        }}
      >
        <Box
          mb={10}
          borderBottom="1px solid"
          borderColor="border"
          background={getUserBackGround(
            { primaryColor, secondaryColor },
            { isRevert: true }
          )}
        >
          <Container py={10}>
            <Flex gap={4} flexDirection={['column', 'column', 'column', 'row']}>
              <Box>
                <ProfileInfo data={data} />
                <ClaimFreeCardsButton size="lg" w="100%" mt={4} />
              </Box>
              <Box flex="1">
                <MyProfileTabs />
                {children}
              </Box>
            </Flex>
          </Container>
        </Box>
      </MyProfileContext.Provider>
    </MainLayout>
  );
};

export default MyProfileLayout;
