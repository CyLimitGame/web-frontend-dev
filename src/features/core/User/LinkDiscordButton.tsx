import React from 'react';
import { Box, BoxProps, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';

import { navigateTo } from '@/utils/navigation';
import { NEXT_PUBLIC_LINK_DISCORD_ACCOUNT } from '@/config/appConfig';
import { useGetUserProfile, useLinkAccount } from '@/queries/useUser';
import { Text } from '@/components/Common';

type Props = {
  boxUnlinkProps?: BoxProps;
};

const LinkDiscordButton = ({ boxUnlinkProps = {} }: Props) => {
  const { t } = useTranslation();
  const { data } = useGetUserProfile();
  const { mutate } = useLinkAccount();

  const username = _.get(data, 'discord.username');
  const discriminator = _.get(data, 'discord.discriminator');

  const handleLink = () => {
    navigateTo(NEXT_PUBLIC_LINK_DISCORD_ACCOUNT as string);
  };

  const handleUnlink = () => {
    mutate({ unlink: true, type: 'discord' });
  };

  return data?.discord ? (
    <Flex alignItems="center">
      <Box display="inline-block" {...boxUnlinkProps}>
        <Text as="span">
          {username}#{discriminator}
        </Text>
      </Box>

      <Text
        display="inline-block"
        onClick={handleUnlink}
        ml={4}
        color="whiteAlpha.280"
        cursor="pointer"
        _hover={{ textDecoration: 'underline' }}
      >
        {t('unlink')}
      </Text>
    </Flex>
  ) : (
    <Text
      onClick={handleLink}
      color="whiteAlpha.280"
      cursor="pointer"
      _hover={{ textDecoration: 'underline' }}
    >
      {t('link_to_discord')}
    </Text>
  );
};

export default LinkDiscordButton;
