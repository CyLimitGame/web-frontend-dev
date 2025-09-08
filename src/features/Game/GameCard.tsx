import React from 'react';
import { Box, Center, Flex, Icon, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { MdBarChart, MdGroup } from 'react-icons/md';
import _ from 'lodash';
import { IoMdEye } from 'react-icons/io';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { useGameContext } from './GameContext';
import TakeRewardButton from './TakeRewardButton';

import { LeagueIcon } from '@/features/core/Common';
import { CountdownTime, Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';
import { GameModel } from '@/typings/game';
import { GameStatus } from '@/typings/game.enum';
import { PATH } from '@/constants/path';
import { getTemplatePath } from '@/utils/string';

type Props = {
  item: GameModel;
  onClickInfo: (gameId: string) => void;
};

const Title = ({ startDate }: { startDate: string }) => {
  const router = useRouter();
  const status = router.query.status || GameStatus.COMMING;
  if (status === GameStatus.COMMING) {
    return (
      <Flex gap={2}>
        <Text color="blue.400" translateText="upcoming" />
        <CountdownTime date={startDate} />
      </Flex>
    );
  }
  if (status === GameStatus.INPROGRESS) {
    return (
      <Flex gap={2} justifyContent="space-between" w="100%">
        <Text color="yellow.400" translateText="live" />
        <Icon as={MdBarChart} />
      </Flex>
    );
  }
  return (
    <Flex gap={2} justifyContent="space-between" w="100%">
      <Text color="error.400" translateText="ended" />
      <Icon as={MdBarChart} />
    </Flex>
  );
};

const JoinTheLiveButton = ({ item }: { item: any }) => {
  const { setGameContext } = useGameContext();
  const { t } = useTranslation();

  const leagues = _.get(item, 'rule.leagues', []);
  const findLeague = _.find(
    leagues,
    (league) => _.get(league, 'division.name', '') === 'League 4'
  );

  const handleToggle = () => {
    setGameContext({
      isOpenModal: true,
      activeIndex: 3,
      divisionId: _.get(findLeague, 'divisionId', ''),
      gameId: _.get(item, 'id'),
    });
  };

  return (
    <BaseButton
      size="md"
      variant="outline"
      color="yellow.500"
      onClick={handleToggle}
    >
      {t('join_the_live')}
    </BaseButton>
  );
};

const StatusButton = ({
  status,
  item,
  isFullLeagues,
}: {
  status: string;
  item: any;
  isFullLeagues: boolean;
}) => {
  const { t } = useTranslation();
  if (status === 'comming') {
    return (
      <Link
        href={getTemplatePath(PATH.MAKE_MY_TEAM, { gameId: item.id })}
        passHref={!isFullLeagues}
      >
        <BaseButton
          size="md"
          variant="outline"
          as="a"
          onClick={(e) => (isFullLeagues ? e.preventDefault() : undefined)}
          isDisabled={isFullLeagues}
        >
          {t('make_my_team')}
        </BaseButton>
      </Link>
    );
  }
  if (status === 'in_progress') {
    return <JoinTheLiveButton item={item} />;
  }

  return (
    <TakeRewardButton
      gameId={item.id}
      isRewardConfirmed={item.isRewardConfirmed}
    />
  );
};

const GameCard = ({ item, onClickInfo }: Props) => {
  const { setGameContext } = useGameContext();

  const router = useRouter();
  const status = (_.get(router, 'query.status') || 'comming') as string;

  const { t } = useTranslation();
  const leagues = _.get(item, 'rule.leagues', []);
  const gameId = _.get(item, 'id');

  const myTeamInLeagues = _.filter(
    leagues,
    (league) => !!_.get(league, 'myTeamId')
  );

  const isFullLeagues = myTeamInLeagues.length === leagues.length;

  const handleView = (divisionId: string) => {
    if (status === 'comming') {
      return setGameContext({
        isOpenMyTeam: true,
        gameId,
        divisionId,
      });
    }
    setGameContext({
      activeIndex: status === 'past' ? 3 : 1,
      isOpenModal: true,
      gameId,
      divisionId,
    });
  };

  return (
    <Box>
      <Box p={4} w="100%" border="1px solid white" borderRadius="xl">
        <Text fontWeight="bold">{item.name}</Text>
        <Flex gap={4} fontWeight="bold">
          <Title startDate={item.startDate} />
        </Flex>
        <Flex
          justifyContent="space-between"
          direction={['column', 'column', 'row']}
        >
          <Box flex={1}>
            <Box pos="relative" width="200px" height="100px" my={2}>
              <Image src={item.imageUrl} layout="fill" />
            </Box>
          </Box>
          <Flex w="100%" justifyContent="space-between" flex={1}>
            <Box>
              <Center
                bg="input"
                w="50px"
                h="50px"
                flexDirection="column"
                borderRadius="md"
              >
                <Icon as={MdGroup} fontSize="xl" />
                <Text fontWeight="bold" fontSize="sm">
                  {item.teamIds.length}
                </Text>
              </Center>
            </Box>
            <Stack spacing={2}>
              {_.map(leagues, (item) => {
                const myTeamId = _.get(item, 'myTeamId');
                return (
                  <Flex
                    key={item.divisionId}
                    gap={2}
                    justifyContent="end"
                    alignItems="center"
                    width="200px"
                  >
                    <Text fontWeight="bold">${item.usdcReward}</Text>
                    <LeagueIcon name={item.division.name} />
                    <Box w="16px" h="16px">
                      {myTeamId && (
                        <Icon
                          as={IoMdEye}
                          cursor="pointer"
                          onClick={() => handleView(item.divisionId)}
                        />
                      )}
                    </Box>
                  </Flex>
                );
              })}
            </Stack>
          </Flex>
        </Flex>
        <Box>
          <BaseButton
            variant="outline"
            size="md"
            onClick={() => onClickInfo(item.id)}
          >
            {t('info')}
          </BaseButton>
        </Box>
      </Box>
      <Flex justifyContent="end" mt={2}>
        <StatusButton
          status={status}
          item={item}
          isFullLeagues={isFullLeagues}
        />
      </Flex>
    </Box>
  );
};

export default GameCard;
