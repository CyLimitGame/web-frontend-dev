import React from 'react';
import { Box, BoxProps, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';

import { NEXT_PUBLIC_LINK_TWITTER_ACCOUNT } from '@/config/appConfig';
import { navigateTo } from '@/utils/navigation';
import { useGetUserProfile, useLinkAccount } from '@/queries/useUser';
import { Text } from '@/components/Common';

type Props = {
  boxUnlinkProps?: BoxProps;
};

const LinkTwitterButton = ({ boxUnlinkProps = {} }: Props) => {
  const { t } = useTranslation();
  const { data } = useGetUserProfile();
  const { mutate } = useLinkAccount();

  const username = _.get(data, 'twitter.username');

  const handleLink = () => {
    navigateTo(NEXT_PUBLIC_LINK_TWITTER_ACCOUNT as string);
  };

  const handleUnlink = () => {
    mutate({ unlink: true, type: 'twitter' });
  };

  return data?.twitter ? (
    <Flex alignItems="center">
      <Box display="inline-block" {...boxUnlinkProps}>
        <Text as="span">{username}</Text>
      </Box>
      <Text
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
      {t('link_to_twitter')}
    </Text>
  );
};

export default LinkTwitterButton;
