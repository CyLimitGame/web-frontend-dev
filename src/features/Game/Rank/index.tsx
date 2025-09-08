import React, { useEffect, useMemo, useState } from 'react';
import _, { size } from 'lodash';
import { Box, Center, Flex, Stack, useDisclosure } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { useGameContext } from '../GameContext';

import RankingItem from './RankingItem';
import ViewScoreModal from './ViewScoreModal';
import SwitchModeScore from './SwitchModeScore';

import { useGetGameRankings, useGetTemplateRule } from '@/queries/useGame';
import { SelectInput } from '@/components/Inputs';
import {
  JerseyWithSponsor,
  LoaderContainer,
  NoResultFound,
  Text,
} from '@/components/Common';
import { User } from '@/typings/user';

import { getGameTeams, getTemplateRule } from '@/apis';
import { Jersey, Sponsor } from '@/typings/user.enum';

const sortRankingByPoint = (data: any, isAcquired: boolean) => {
  const response = _.map(data, (item) => {
    const results = isAcquired
      ? _.get(item, 'acquiredResults', [])
      : _.get(item, 'results', []);
    return { ...item, sortPoint: _.sumBy(results, 'point') };
  });
  return _.orderBy(response, 'sortPoint', 'desc');
};

const useRank = (gameId: string) => {
  const { gameContext } = useGameContext();
  const [divisionId, setDivisionId] = useState<string>(
    gameContext.divisionId as string
  );

  const { data, isLoading } = useQuery([gameId], async () => {
    const [gameInfo, gameTeam] = await Promise.all([
      getTemplateRule(gameId),
      getGameTeams(gameId),
    ]);

    return {
      gameInfo,
      gameTeam,
    };
  });

  const leagues = useMemo(
    () =>
      _.map(_.get(data, 'gameInfo.rule.leagues'), (item) => ({
        id: _.get(item, 'division.id', ''),
        label: _.get(item, 'division.name', ''),
        value: _.get(item, 'division.id', ''),
      })),
    [data]
  );

  useEffect(() => {
    if (data && !gameContext.divisionId) {
      const myTeam = _.get(data, 'gameTeam.[0].divisionId', '');
      setDivisionId(
        myTeam || _.get(data, 'gameInfo.rule.leagues[0].divisionId', '')
      );
    }
  }, [data]);

  return {
    divisionId,
    setDivisionId,
    leagues,
    isLoading,
  };
};

type Props = {
  gameId: string;
};

type TopRankingProps = {
  items: User;
};

const TopRanking = ({ items }: TopRankingProps) => {
  const firstUser = _.get(items, '[0].createdBy', {});
  const secondUser = _.get(items, '[1].createdBy', {});
  const thirdUser = _.get(items, '[2].createdBy', {});

  if (size(items) < 3) {
    return null;
  }

  const getProps = (user: any) => {
    return {
      jersey: _.get(user, 'jersey', '') as Jersey,
      sponsor: _.get(user, 'sponsor', '') as Sponsor,
      secondaryColor: _.get(user, 'secondaryColor'),
      primaryColor: _.get(user, 'primaryColor'),
    };
  };

  return (
    <Flex gap={2} maxW="600px" mx="auto">
      <Center flex={1} flexDirection="column" justifyContent="end">
        <JerseyWithSponsor
          {...getProps(secondUser)}
          fontSize={['80px', '140px']}
        />
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          my={2}
          fontSize={['xs', 'sm']}
          textAlign="center"
        >
          {_.get(secondUser, 'nickName')}
        </Text>
        <Text
          fontWeight="bold"
          bg="input"
          w="100%"
          textAlign="center"
          borderRadius="md"
          p={3}
        >
          2
        </Text>
      </Center>
      <Center flex={1} flexDirection="column">
        <JerseyWithSponsor
          {...getProps(firstUser)}
          fontSize={['100px', '150px']}
        />
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          my={2}
          fontSize={['xs', 'sm']}
        >
          {_.get(firstUser, 'nickName')}
        </Text>
        <Text
          fontWeight="bold"
          bg="input"
          w="100%"
          textAlign="center"
          borderRadius="md"
          p={5}
        >
          1
        </Text>
      </Center>
      <Center flex={1} flexDirection="column" justifyContent="end">
        <JerseyWithSponsor
          {...getProps(thirdUser)}
          fontSize={['80px', '140px']}
        />
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          my={2}
          fontSize={['xs', 'sm']}
        >
          {_.get(thirdUser, 'nickName')}
        </Text>
        <Text
          fontWeight="bold"
          bg="input"
          w="100%"
          textAlign="center"
          borderRadius="md"
          p={2}
        >
          3
        </Text>
      </Center>
    </Flex>
  );
};

const Rank = ({ gameId }: Props) => {
  const {
    leagues,
    divisionId,
    setDivisionId,
    isLoading: isLoadingTeam,
  } = useRank(gameId);
  const { data, isLoading } = useGetGameRankings({
    gameId,
    divisionId,
    limit: Number.MAX_SAFE_INTEGER,
    page: 1,
  });

  const router = useRouter();
  const status = _.get(router, 'query.status', 'comming');
  const { data: gameInfo } = useGetTemplateRule(gameId);
  const isUsingLiveRanking = _.get(gameInfo, 'isUsingLiveRanking', false);

  const [isAcquired, setIsAcquired] = useState(status === 'in_progress');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [itemViewScore, setItemViewScore] = useState<any>();

  const items = sortRankingByPoint(data?.items, isAcquired);

  const rewardItems = useMemo(() => {
    const rewardJackpotLeagues = _.get(gameInfo, 'rewardJackpotLeagues');
    const rewardTemplateLeagues = _.get(gameInfo, 'rewardTemplateLeagues');

    const rewardJackpotLeague = _.find(
      rewardJackpotLeagues,
      (item) => _.get(item, 'divisionId') === divisionId
    );
    const rewardTemplateLeague = _.find(
      rewardTemplateLeagues,
      (item) => _.get(item, 'divisionId') === divisionId
    );

    const rankingPackages = _.get(
      rewardTemplateLeague,
      'gameRewardTemplate.rankingPackages'
    );

    const rankingList = _.keyBy(rankingPackages, 'rankingFrom');

    const scoreCondition = _.get(
      rewardJackpotLeague,
      'scoreCondition',
      'greater_than'
    );

    const convertItems = _.map(items, (item, index) => {
      const greaterThan =
        _.get(item, 'sortPoint', 0) > _.get(rewardJackpotLeague, 'minScore', 0)
          ? _.get(rewardJackpotLeague, 'usdcReward', 0)
          : 0;

      const greaterThanOrEqual =
        _.get(item, 'sortPoint', 0) >= _.get(rewardJackpotLeague, 'minScore', 0)
          ? _.get(rewardJackpotLeague, 'usdcReward', 0)
          : 0;

      return {
        ...item,
        gameReward: {
          ..._.get(rankingList, `${index + 1}`),
          usdcRewards: [
            { value: _.get(rankingList, `${index + 1}.usdcReward`, 0) },
          ],
          jackpotReward:
            scoreCondition === 'greater_than'
              ? greaterThan
              : greaterThanOrEqual,
        },
      };
    });

    return status === 'in_progress' ? convertItems : items;
  }, [items, gameInfo, status, divisionId]);

  return (
    <Box>
      <LoaderContainer isLoading={isLoadingTeam}>
        <Flex
          gap={[2, 2, 4]}
          alignItems="center"
          direction={['column', 'column', 'row']}
          pb={4}
        >
          <Box>
            <SelectInput
              name="select"
              choices={leagues || []}
              maxW="200px"
              style={{ border: '1px solid white' }}
              value={divisionId}
              onChange={(e) => setDivisionId(e.target.value)}
              mb={2}
            />
          </Box>
          {status === 'in_progress' && isUsingLiveRanking && (
            <SwitchModeScore onChange={setIsAcquired} isAcquired={isAcquired} />
          )}
        </Flex>
        <LoaderContainer
          isLoading={isLoading}
          notFoundComponent={<NoResultFound type="common" />}
          dataFound={items}
        >
          <Box mb={4}>
            <TopRanking items={items as any} />
          </Box>
          <Flex
            textTransform="uppercase"
            justifyContent="space-between"
            fontWeight="bold"
            fontSize={['xs', 'sm', 'md']}
            display={['none', 'none', 'flex']}
            p={2}
          >
            <Text translateText="rank" w="50px" />
            <Box flex={1}></Box>
            <Box flex={1}>
              <Text translateText="card_rewards" textAlign="center" />
            </Box>
            <Box flex={1}>
              <Text translateText="cash_rewards" textAlign="center" />
            </Box>
            <Box w="60px">
              <Text translateText="score" textAlign="center" />
            </Box>
            <Box w="50px"></Box>
          </Flex>
          <Stack spacing={2} mt={2}>
            {_.map(rewardItems, (item, index: number) => (
              <RankingItem
                item={item as any}
                key={item.id}
                index={index}
                isAcquired={isAcquired}
                onClickScore={(card) => {
                  setItemViewScore({ ...item, card });
                  onOpen();
                }}
              />
            ))}
          </Stack>
        </LoaderContainer>
      </LoaderContainer>
      <ViewScoreModal
        isOpen={isOpen}
        onClose={onClose}
        item={itemViewScore}
        defaultIsAcquired={isAcquired}
        isUsingLiveRanking={isUsingLiveRanking}
        isGameInprogress={status === 'in_progress'}
      />
    </Box>
  );
};

export default Rank;
