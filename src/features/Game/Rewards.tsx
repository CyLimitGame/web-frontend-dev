import React, { useEffect, useMemo, useState } from 'react';
import { Box, Center, Flex, Icon, Stack } from '@chakra-ui/react';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { MdStar } from 'react-icons/md';

import { LeagueIcon } from '@/features/core/Common';
import { useGetTemplateRule } from '@/queries/useGame';
import { SelectInput } from '@/components/Inputs';
import { LoaderContainer, Text } from '@/components/Common';
import { getRarityImage } from '@/utils/string';

type Props = {
  gameId: string;
};

const useReward = (gameId: string) => {
  const [divisionId, setDivisionId] = useState('');
  const { data: gameInfo, isLoading } = useGetTemplateRule(gameId);

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
    'gameRewardTemplate.rankingPackages',
    []
  );

  const leagues = useMemo(
    () =>
      _.map(_.get(gameInfo, 'rule.leagues'), (item) => ({
        id: _.get(item, 'division.id'),
        label: _.get(item, 'division.name'),
        value: _.get(item, 'division.id'),
      })),
    [gameInfo]
  );

  useEffect(() => {
    if (leagues) {
      setDivisionId(_.get(leagues, '[0].id', ''));
    }
  }, [leagues]);

  return {
    usdcReward: _.get(rewardJackpotLeague, 'usdcReward'),
    scoreCondition: _.get(rewardJackpotLeague, 'scoreCondition'),
    divisionId,
    setDivisionId,
    minScore: _.get(rewardJackpotLeague, 'minScore'),
    leagues,
    rankingPackages,
    league: _.find(leagues, (item) => item.id === divisionId),
    isLoading,
  };
};

const Rewards = ({ gameId }: Props) => {
  const { t } = useTranslation();
  const {
    setDivisionId,
    divisionId,
    leagues,
    usdcReward,
    minScore,
    scoreCondition,
    rankingPackages,
    league,
    isLoading,
  } = useReward(gameId);

  return (
    <LoaderContainer isLoading={isLoading}>
      <SelectInput
        name="select"
        choices={leagues}
        maxW="200px"
        style={{ border: '1px solid white' }}
        value={divisionId}
        onChange={(e) => setDivisionId(e.target.value)}
      />
      <Flex
        gap={4}
        mt={4}
        display={scoreCondition && minScore ? 'flex' : 'none'}
        direction={['column', 'column', 'row']}
      >
        <Flex
          p={4}
          gap={2}
          border="1px solid white"
          display="inline-flex"
          borderRadius="xl"
          alignItems="center"
          justifyContent={['center', 'center', 'start']}
        >
          <Text
            textTransform="uppercase"
            fontWeight="bold"
            fontSize="2xl"
            translateText="jackpot"
          />
          <Text fontWeight="bold" fontSize="2xl" color="yellow.300">
            {usdcReward}$
          </Text>
        </Flex>
        <Flex gap={2} alignItems="center" fontSize={['xs', 'sm', 'md']}>
          <Text textTransform="uppercase">For</Text>
          <LeagueIcon name={_.get(league, 'label')} />
          <Text fontWeight="bold" textTransform="uppercase">
            {_.get(league, 'label')}
          </Text>
          <Text
            textAlign="center"
            translateText="to_share_with_condition"
            fontWeight="bold"
            textTransform="uppercase"
            variables={{
              value: minScore,
              condition: t(`${scoreCondition}_symbol`),
            }}
          />
        </Flex>
      </Flex>
      <Text
        fontWeight="bold"
        textTransform="uppercase"
        color="yellow.300"
        mt={5}
        translateText="cash_and_card_reward"
        fontSize={['sm', 'md']}
      />
      <Flex
        maxW="600px"
        mx="auto"
        textTransform="uppercase"
        fontWeight="bold"
        textAlign="center"
        fontSize={['xs', 'sm', 'md']}
        mt={2}
      >
        <Text flex={1} translateText="rank" />
        <Text flex={1} translateText="cash_rewards" />
        <Text flex={1} translateText="card_rewards" />
      </Flex>
      <Stack border="1px solid white" p={4} borderRadius="xl" mt={4}>
        {_.map(rankingPackages, (item: any, index) => {
          const nftRewardTemplates = _.get(item, 'nftRewardTemplates');
          return (
            <Flex
              key={index}
              justifyContent="center"
              fontWeight="bold"
              borderBottom="1px dashed"
              borderColor="border"
              py={2}
              textAlign="center"
            >
              <Text w="200px">{item.rankingFrom}</Text>
              <Text w="200px">
                {item.usdcReward ? `${item.usdcReward}$` : '-'}
              </Text>
              <Flex w="200px" gap={2} justifyContent="center">
                {_.map(nftRewardTemplates, (nft) => (
                  <Box
                    key={nft.rarity}
                    pos="relative"
                    w="28px"
                    h="42px"
                    borderRadius="sm"
                    overflow="hidden"
                  >
                    <Image src={getRarityImage(nft.rarity)} layout="fill" />
                    <Center pos="absolute" w="100%" h="100%" flexWrap="wrap">
                      {_.map(
                        Array.from(Array(nft.riderStar).keys()),
                        (_key, index) => (
                          <Icon as={MdStar} fontSize="xs" key={index} />
                        )
                      )}
                    </Center>
                  </Box>
                ))}
              </Flex>
            </Flex>
          );
        })}
      </Stack>
    </LoaderContainer>
  );
};

export default React.memo(Rewards);
