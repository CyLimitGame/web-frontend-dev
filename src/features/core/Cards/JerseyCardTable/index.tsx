import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';

import { User } from '@/typings/auction';
import { getFullName } from '@/utils/user';
import { PATH } from '@/constants/path';
import { getTemplatePath } from '@/utils/string';
import { JerseyWithSponsor } from '@/components/Common';
import { Sponsor } from '@/typings/user.enum';

const JerseyCardTable = ({ user }: { user: User }) => {
  const { jersey, primaryColor, secondaryColor, sponsor } = user || {};

  return (
    <Link
      href={getTemplatePath(PATH.USER_DETAIL, { userId: user.id })}
      passHref
    >
      <Flex
        p="5px 16px"
        alignItems="center"
        gap="10px"
        backgroundColor="whiteAlpha.160"
        borderRadius="50px"
        cursor="pointer"
        _hover={{ filter: 'brightness(0.8)' }}
        as="a"
        userSelect="none"
      >
        <Text fontWeight="bold">{getFullName(user)}</Text>
        {jersey && primaryColor && secondaryColor ? (
          <JerseyWithSponsor
            jersey={jersey}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            sponsor={sponsor as Sponsor}
            width={['16px', '24px']}
            height={['16px', '24px']}
          />
        ) : null}
      </Flex>
    </Link>
  );
};

export default JerseyCardTable;
