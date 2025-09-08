import React from 'react';
import Image from 'next/image';
import { Box, Center, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import _ from 'lodash';

import moment from 'moment';

import { PACK } from '@/constants/images';
import { CylimitLogo, Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import { useGetUserProfile, useSkipNoticeFreeCards } from '@/queries/useUser';
import { AuthLayout } from '@/layouts';
import { useGetGames } from '@/queries/useGame';
import { GameStatus } from '@/typings/game.enum';

const OpenThePack = () => {
  const { t } = useTranslation();

  const { data: game } = useGetGames({
    status: GameStatus.COMMING,
    limit: 1,
    page: 1,
    gameMode: 'cap',
  });
  const gameImage = _.get(game, 'items[0].imageUrl', '');
  const startDate = _.get(game, 'items[0].startDate', '');

  const { mutateAsync, isLoading } = useSkipNoticeFreeCards();
  const { data } = useGetUserProfile();

  const handleNavigate = async () => {
    await mutateAsync({});
    navigateTo(PATH.TAKE_FREE_CARDS);
  };

  return (
    <AuthLayout>
      <Center minH="100vh" flexDirection="column">
        <Stack spacing={4}>
          <Center>
            <CylimitLogo />
          </Center>
          <Center flexDirection="column" textTransform="initial">
            <Box display={gameImage ? 'block' : 'none'}>
              <Center>
                <Image src={gameImage} width="200px" height="100px" />
              </Center>
              <Text
                textAlign="center"
                mt={4}
                translateText="team_next_race"
                variables={{
                  team: data?.nickName,
                  date: moment(startDate).format('LL'),
                }}
              />
            </Box>
            <Text
              textAlign="center"
              translateText="you_need_riders_to_take_part"
            />
          </Center>
          <Center>
            <Image src={PACK} width="300px" height="380px" />
          </Center>
          <Center>
            <BaseButton
              variant="light"
              w="210px"
              onClick={handleNavigate}
              isLoading={isLoading}
            >
              {t('open_the_pack')}
            </BaseButton>
          </Center>
        </Stack>
      </Center>
    </AuthLayout>
  );
};

export default OpenThePack;
