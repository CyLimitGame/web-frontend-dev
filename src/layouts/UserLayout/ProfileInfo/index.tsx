import React from 'react';
import { Flex, Icon, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { FaDiscord, FaTwitter } from 'react-icons/fa';

import FollowButton from './FollowButton';

import UnfollowButton from './UnfollowButton';

import { AvatarGradient, Text } from '@/components/Common';
import { useGetProfileById, useDoesUserFollow } from '@/queries/useUser';
import { getFullName } from '@/utils/user';

export const ProfileInfo = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetProfileById(id as string);
  const { data: isFollowing } = useDoesUserFollow(id as string);

  const twitterUsername = _.get(data, 'twitter.username');
  const discordUsername = _.get(data, 'discord.username');
  const discriminator = _.get(data, 'discord.discriminator');

  return (
    <Box textAlign="center">
      <AvatarGradient
        boxProps={{ p: 1 }}
        width="128"
        height="128"
        padding="8px"
        src={data?.avatarUrl || ''}
      />
      <Text fontSize="xl" fontWeight="bold" color="gray.900" my={3}>
        {getFullName(data)}
      </Text>
      <Box mb={4}>
        {isFollowing ? (
          <UnfollowButton id={id as string} />
        ) : (
          <FollowButton id={id as string} />
        )}
      </Box>
      {discordUsername && (
        <Flex
          gap={2}
          alignItems="center"
          justifyContent="center"
          _hover={{ color: 'primary.500' }}
        >
          <Icon as={FaDiscord} />
          <Text>
            {discordUsername}#{discriminator}
          </Text>
        </Flex>
      )}
      {twitterUsername && (
        <Flex
          gap={2}
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          _hover={{ color: 'primary.500' }}
          onClick={() =>
            window.open(`https://twitter.com/${twitterUsername}`, '_blank')
          }
        >
          <Icon as={FaTwitter} />
          <Text>{twitterUsername}</Text>
        </Flex>
      )}
    </Box>
  );
};

export default ProfileInfo;
