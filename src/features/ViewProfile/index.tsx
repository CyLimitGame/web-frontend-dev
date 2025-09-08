import React from 'react';
import { useTranslation } from 'next-i18next';
import { Box, Flex, Icon } from '@chakra-ui/react';
import moment from 'moment';
import { RiPencilLine } from 'react-icons/ri';

import LinkDiscordButton from '../core/User/LinkDiscordButton';

import LinkTwitterButton from '../core/User/LinkTwitterButton';

import CoverBackground from './CoverBackground';

import { AvatarGradient, Container, Text } from '@/components/Common';
import MainLayout from '@/layouts/MainLayout';
import { useGetUserProfile } from '@/queries/useUser';
import { getFullName } from '@/utils/user';
import { BaseButton } from '@/components/Button';
import { navigateToEditMyProfile } from '@/utils/navigation';

const ViewProfile = () => {
  const { t } = useTranslation();
  const { data } = useGetUserProfile();

  return (
    <MainLayout>
      <CoverBackground />
      <Container>
        <Box position="relative" height="260px">
          <Flex
            maxW="260px"
            flexDirection="column"
            alignItems="center"
            position="absolute"
            left="50%"
            transform="translate(-50%, -80px)"
          >
            <Box textAlign="center">
              <AvatarGradient
                boxProps={{ p: 1 }}
                padding="8px"
                width="128"
                height="128"
                src={data?.avatarUrl || ''}
              />
              <Text fontSize="xl" fontWeight="bold" color="gray.900" mt={4}>
                {getFullName(data)}
              </Text>
              <Text
                fontSize="sm"
                color="gray.400"
                mt={2}
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
                maxWidth="220px"
              >
                {data?.email}
              </Text>
              <BaseButton
                colorScheme="primary"
                leftIcon={<Icon as={RiPencilLine} />}
                onClick={navigateToEditMyProfile}
                mt={4}
              >
                {t('edit_profile')}
              </BaseButton>
            </Box>
          </Flex>
        </Box>
        <Box shadow="md" borderRadius="xl" p={10}>
          <Text translateText="information" fontSize="xl" fontWeight="bold" />
          <Flex my={3}>
            <Text width="220px">{t('full_name')}:</Text>
            <Text>{getFullName(data)}</Text>
          </Flex>
          <Flex my={3}>
            <Text width="220px">{t('email')}:</Text>
            <Text>{data?.email}</Text>
          </Flex>
          <Flex my={3}>
            <Text width="220px">{t('date_of_birth')}:</Text>
            <Text>
              {data?.dateOfBirth
                ? moment(data.dateOfBirth).format('DD/MM/YYYY')
                : '-'}
            </Text>
          </Flex>
          <Flex my={3}>
            <Text width="220px">{t('phone_number')}:</Text>
            <Text>{data?.phoneNumber || '-'}</Text>
          </Flex>
          <Flex my={3}>
            <Text width="220px">Discord:</Text>
            <LinkDiscordButton />
          </Flex>
          <Flex my={3}>
            <Text width="220px">Twitter:</Text>
            <LinkTwitterButton />
          </Flex>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default ViewProfile;
