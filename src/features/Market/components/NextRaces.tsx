import React from 'react';
import { Box, Center, Flex, Icon, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';
import Image from 'next/image';
import { MdGroup } from 'react-icons/md';
import Link from 'next/link';

import { CountdownTime } from '@/components/Common';
import { GameStatus } from '@/typings/game.enum';
import { useGetGames } from '@/queries/useGame';
import { GameModel } from '@/typings/game';
import { PATH } from '@/constants/path';

const Race = ({ data }: { data: GameModel }) => {
  return (
    <Link href={PATH.GAME} passHref>
      <Box as="a" _hover={{ opacity: 0.5 }}>
        <Flex
          cursor="pointer"
          borderWidth={['2px', '2px', '4px']}
          borderStyle="solid"
          borderColor="white"
          borderRadius="20px"
          alignItems="center"
          justifyContent="space-between"
          py={['10px', '10px', '13px']}
          px={['12px', '12px', '20px']}
          height="83px"
        >
          <Image src={data.imageUrl} height={70} width={150} />
          <Center w="50px" h="50px" flexDirection="column" borderRadius="md">
            <Icon as={MdGroup} fontSize="xl" w="24px" h="24px" />
            <Text fontWeight="bold" fontSize="sm">
              {data?.teamIds.length}
            </Text>
          </Center>
        </Flex>
        <Box mt={2}>
          <CountdownTime
            date={data?.startDate}
            renderCustom={(time, { days, hours }) => (
              <Text
                mt="2px"
                textAlign="right"
                color={days === 0 && hours === 0 ? 'red' : 'white'}
              >
                {time}
              </Text>
            )}
          />
        </Box>
      </Box>
    </Link>
  );
};
const NextRaces = () => {
  const { t } = useTranslation();
  const { data } = useGetGames({
    page: 1,
    limit: 2,
    status: GameStatus.COMMING,
  });

  if (!data || data.items?.length === 0) return null;

  return (
    <Box>
      <Text
        textTransform="uppercase"
        fontStyle="normal"
        fontWeight="bold"
        fontSize={['16px', '22px', '28px']}
        mb="12px"
      >
        {t('next_races')}
      </Text>
      <Flex flexDirection="column" gap={['20px', '30px', '46px']}>
        {_.map(data?.items || [], (item) => (
          <Race key={item?.id} data={item} />
        ))}
      </Flex>
    </Box>
  );
};

export default NextRaces;
