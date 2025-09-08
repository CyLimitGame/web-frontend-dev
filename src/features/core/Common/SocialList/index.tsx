import React from 'react';
import { Flex, Icon, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

import { SOCIAL_LIST } from '@/constants/footer';

const SocialList = () => {
  return (
    <Flex alignItems="center" gap={2}>
      {SOCIAL_LIST.map(({ path, ...itemProps }, index) => (
        <NextLink key={index} href={path} passHref>
          <Link target="_blank">
            <Icon {...itemProps} color="gray.400" cursor="pointer" />
          </Link>
        </NextLink>
      ))}
    </Flex>
  );
};

export default SocialList;
