import { Box, Flex, Icon } from '@chakra-ui/react';
import _get from 'lodash/get';
import Image from 'next/image';

import moment from 'moment';

import League from '@/features/core/Game/League';
import { Cell } from '@/features/core/Table/TableInfo';

import Translate from '@/components/Translate';
import { BaseButton } from '@/components/Button';
import { GAME_ACCESS, GAME_EXPERT } from '@/constants/images';
import { MyTeam } from '@/typings/game';
import { fixedNumber } from '@/utils/common';
import CupIcon2 from '@/icons/CupIcon2';
import { GameMode } from '@/typings/game.enum';
import { Text } from '@/components/Common';

export const myTeamColumns: Cell<MyTeam>[] = [
  {
    Cell: (team) => (
      <Flex gap={2} alignItems="center">
        <Text fontWeight="bold">{_get(team, 'game.name', '')}</Text>
        <Text
          bg="input"
          fontSize="xs"
          px={2}
          borderRadius="2xl"
          fontWeight="bold"
          translateText={
            moment().isBefore(team?.game?.startDate) ? 'coming' : 'in_progress'
          }
          w="94px"
        />
      </Flex>
    ),
  },
  {
    Cell: (team) => (
      <Box
        display={['none', 'none', 'inline-block']}
        position="relative"
        w={['72px', '72px', '127px']}
        h={['20px', '20px', '35px']}
      >
        <Image
          src={
            team?.game?.gameMode === GameMode.EXPERT ? GAME_EXPERT : GAME_ACCESS
          }
          layout="fill"
        />
      </Box>
    ),
  },
  {
    Cell: (team) => <League league={team?.division.name} />,
  },

  {
    Cell: (team) => (
      <Text
        whiteSpace="nowrap"
        opacity={moment().isBefore(team?.game?.startDate) ? 0 : 1}
      >
        {`${fixedNumber(team.totalPoint)} PTS`}
      </Text>
    ),
  },
  {
    cellProps: {
      fontWeight: 'bold',
      verticalAlign: 'middle',
    },
    Cell: (team) => (
      <Flex
        w={['56px', '100px', 'auto']}
        alignItems="center"
        gap={2}
        opacity={moment().isBefore(team?.game?.startDate) ? 0 : 1}
      >
        <Icon as={CupIcon2} />
        <Text>
          {team?.ranking || 0} / {team?.numberOfTeams || 0}
        </Text>
      </Flex>
    ),
  },
  {
    Cell: (team, _index, metaData) => (
      <BaseButton
        variant="outline"
        size={['xs', 'sm']}
        onClick={() => metaData.onView(team)}
      >
        <Translate text="view" />
      </BaseButton>
    ),
  },
];
