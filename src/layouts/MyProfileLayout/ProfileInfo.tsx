import React, { useMemo, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import _get from 'lodash/get';

import EditProfileModal from './EditProfileModal';

import { getFullName } from '@/utils/user';
import { formatDate } from '@/utils/date';
import CircleIcon from '@/components/Icon/CircleIcon';
import PencilIcon from '@/icons/PencilIcon';
import { UserProfileForm } from '@/typings/user';
import { JerseyWithSponsor } from '@/components/Common';
import { Sponsor } from '@/typings/user.enum';

type Props = {
  data?: UserProfileForm;
};

const ProfileInfo = ({ data }: Props) => {
  const { t } = useTranslation();
  const [visibleModalEditProfile, setVisibleModalEditProfile] = useState(false);

  const twitterUsername = _get(data, 'twitter.username');
  const discordUsername = _get(data, 'discord.username');
  const discriminator = _get(data, 'discord.discriminator');
  const discordAccount = `${discordUsername}#${discriminator}`;
  const level = _get(data, 'level', 0);

  const ownerImage = useMemo(() => {
    const avatarProps = {
      width: ['40px', '40px', '80px', '110px'],
      height: ['40px', '40px', '80px', '110px'],
    };
    if (!data) return null;
    if (data?.jersey)
      return (
        <JerseyWithSponsor
          jersey={data?.jersey}
          primaryColor={data?.primaryColor || 'white'}
          secondaryColor={data?.secondaryColor || 'white'}
          sponsor={data?.sponsor as Sponsor}
          w="110px"
          h="110px"
        />
      );
    if (data?.avatarUrl) {
      return (
        <Box {...avatarProps}>
          <Image src={data?.avatarUrl} width="100%" height="100%" />
        </Box>
      );
    }
    return null;
  }, [data]);

  return (
    <Box
      padding="20px"
      borderColor="white"
      borderStyle="solid"
      borderWidth={[0, 0, 0, 2]}
      borderRadius="20px"
      backgroundColor={[
        'transparent',
        'transparent',
        'transparent',
        'primary.300',
      ]}
    >
      <CircleIcon
        ml="auto"
        iconProps={{
          as: PencilIcon,
        }}
        onClick={() => setVisibleModalEditProfile(true)}
      />
      <Flex
        flexDirection="column"
        gap={['8px', '8px', '12px', '16px']}
        alignItems="center"
      >
        {ownerImage}
        <Box>
          <Text
            textAlign="center"
            fontWeight="bold"
            fontSize={[20, 20, 28]}
            wordBreak="break-all"
          >
            {getFullName(data)}
          </Text>
          <Text
            textAlign="center"
            color="secondary.350"
            textTransform="uppercase"
            fontWeight="bold"
            fontSize={[14, 14, 16]}
          >
            {t('level')} {level}
          </Text>
        </Box>
      </Flex>
      <Box
        minW="290px"
        sx={{
          '& > div:not(:last-child)': {
            borderBottom: '1px dashed ',
            borderColor: 'whiteAlpha.280',
          },
        }}
      >
        <Box py="10px">
          <Text textTransform="uppercase" fontSize="sm" color="whiteAlpha.700">
            {t('email')}
          </Text>
          <Text>{_get(data, 'email', '')}</Text>
        </Box>
        <Box py="10px">
          <Text textTransform="uppercase" fontSize="sm" color="whiteAlpha.700">
            {t('phone_number')}
          </Text>
          <Text>{_get(data, 'phoneNumber', '')}</Text>
        </Box>
        <Box py="10px">
          <Text textTransform="uppercase" fontSize="sm" color="whiteAlpha.700">
            {t('date_of_birth')}
          </Text>
          <Text>{formatDate(_get(data, 'dateOfBirth', ''))}</Text>
        </Box>
        {!!twitterUsername && (
          <Box py="10px">
            <Text
              textTransform="uppercase"
              fontSize="sm"
              color="whiteAlpha.700"
            >
              twitter
            </Text>
            <a
              href={`https://twitter.com/${twitterUsername}`}
              target="_blank"
              rel="noreferrer"
            >
              <Text cursor="pointer" textDecoration="underline">
                @{twitterUsername}
              </Text>
            </a>
          </Box>
        )}
        {!!discordUsername && (
          <Box py="10px">
            <Text
              textTransform="uppercase"
              fontSize="sm"
              color="whiteAlpha.700"
            >
              discord
            </Text>
            <Text>{discordAccount}</Text>
          </Box>
        )}
      </Box>
      <EditProfileModal
        isOpen={visibleModalEditProfile}
        data={data}
        onClose={() => setVisibleModalEditProfile(false)}
      />
    </Box>
  );
};

export default ProfileInfo;
