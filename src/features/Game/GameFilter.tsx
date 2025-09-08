import React from 'react';
import { Center, Flex, Icon, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import _ from 'lodash';

import { RiLock2Fill } from 'react-icons/ri';

import { PATH } from '@/constants/path';
import { navigateTo } from '@/utils/navigation';
import useParamsQuery from '@/hooks/useGetParams';
import { GameStatus } from '@/typings/game.enum';
import { BaseButton } from '@/components/Button';
import { GAME_ACCESS, GAME_EXPERT } from '@/constants/images';
import { useGetUserProfile } from '@/queries/useUser';
import { Text } from '@/components/Common';

const filterList: FilterItem[] = [
  {
    name: 'coming',
    params: { status: GameStatus.COMMING },
  },
  {
    name: 'in_progress',
    params: { status: GameStatus.INPROGRESS },
  },
  {
    name: 'past',
    params: { status: GameStatus.PAST },
  },
];

type FilterItem = {
  name: string;
  params?: {
    status?: GameStatus;
  };
};

const GameFilter = () => {
  const { t } = useTranslation();
  const { getParam } = useParamsQuery();
  const { data: user } = useGetUserProfile();
  const level = _.get(user, 'level', 0);

  const status: GameStatus = getParam('status') || GameStatus.COMMING;
  const gameMode = getParam('gameMode') || 'cap';

  const handleToggleFilterBy = (item: FilterItem) => {
    navigateTo(PATH.GAME, { ...item.params, gameMode, page: 1 });
  };

  const handleChangeGameMode = (mode: string) => {
    navigateTo(PATH.GAME, { status, gameMode: mode, page: 1 });
  };

  return (
    <Flex direction="column" alignItems="center" gap={4}>
      <Flex gap={1}>
        <span>
          <Image
            src={GAME_ACCESS}
            width="150px"
            height="40px"
            onClick={() => handleChangeGameMode('cap')}
            style={{
              opacity: gameMode === 'cap' ? '1' : '0.5',
              cursor: 'pointer',
            }}
          />
        </span>
        <Tooltip
          label={
            level < 10 && (
              <Center gap={2}>
                <Icon as={RiLock2Fill} />
                <Text translateText="level_10_required" />
              </Center>
            )
          }
        >
          <span>
            <Image
              src={GAME_EXPERT}
              width="150px"
              height="40px"
              onClick={() => level >= 10 && handleChangeGameMode('global')}
              style={{
                opacity: gameMode === 'global' ? '1' : '0.5',
                cursor: level >= 10 ? 'pointer' : 'not-allowed',
              }}
            />
          </span>
        </Tooltip>
      </Flex>
      <Flex gap={2}>
        {filterList.map((item, index) => (
          <BaseButton
            key={index}
            onClick={() => handleToggleFilterBy(item)}
            variant="light"
            opacity={status === item.params?.status ? '1' : '.5'}
            rounded="3xl"
            size={['sm', 'sm', 'md', 'lg']}
          >
            {t(item.name)}
          </BaseButton>
        ))}
      </Flex>
    </Flex>
  );
};

export default GameFilter;
