import { Box, Flex } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import _ from 'lodash';

import Title from '@/features/core/Common/Title';
import { JerseyWithSponsor, Text } from '@/components/Common';
import { getFullName } from '@/utils/user';
import { MarketType } from '@/typings/card.enum';
import { getTemplatePath } from '@/utils/string';
import { PATH } from '@/constants/path';
import { Sponsor } from '@/typings/user.enum';

type Props = {
  item: any;
};

const Owner = ({ item }: Props) => {
  const owner = _.get(item, 'owner', {});

  const ownerImage = useMemo(() => {
    if (!owner) return null;
    if (owner?.jersey)
      return (
        <JerseyWithSponsor
          jersey={owner?.jersey}
          primaryColor={owner?.primaryColor || 'white'}
          secondaryColor={owner?.secondaryColor || 'white'}
          sponsor={owner.sponsor as Sponsor}
          width="40px"
          height="40px"
        />
      );
    if (owner?.avatarUrl) {
      return (
        <Box minH="40px" minW="40px">
          <Image src={owner?.avatarUrl} width="40px" height="40px" />
        </Box>
      );
    }
    return null;
  }, [owner]);

  const Parent =
    owner?.id && item?.marketType !== MarketType.AUCTION ? Link : Box;

  const parentProps = {
    href: getTemplatePath(PATH.USER_DETAIL, { userId: owner?.id }),
    passHref: true,
  };

  return (
    <Box w="full">
      <Title
        title="current_owner"
        mb={2}
        justifyContent={['center', 'center', 'center', 'flex-start']}
      />
      <Parent {...parentProps}>
        <Flex
          cursor={
            item.marketType === MarketType.AUCTION ? 'not-allowed' : 'pointer'
          }
          gap="12px"
          alignItems="center"
          justifyContent="center"
          px={[2, 2, 5]}
          py={[3, 3, 5]}
          border="2px solid"
          borderColor="white"
          borderRadius="20px"
          flexDirection={['column', 'column', 'column', 'row']}
          as="a"
          userSelect="none"
          _hover={{ opacity: 0.5 }}
        >
          {ownerImage}
          <Text
            textAlign="center"
            textTransform="uppercase"
            fontWeight="bold"
            fontSize={[20, 20, 28]}
            wordBreak="break-all"
          >
            {getFullName(item?.owner)}
          </Text>
        </Flex>
      </Parent>
    </Box>
  );
};

export default Owner;
