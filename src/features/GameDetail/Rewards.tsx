import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';
import { Box, Card, Flex, Stack } from '@chakra-ui/react';

import Image from 'next/image';

import { MAP_CARD } from './TeamComposition';

import { useGetTemplateRule } from '@/queries/useGame';
import { SelectInput } from '@/components/Inputs';
import { DataGridWithFlex, Text } from '@/components/Common';
import { capitalizeAndStartCase } from '@/utils/string';
import {
  TEAM_RANKING_1ST,
  TEAM_RANKING_2ND,
  TEAM_RANKING_3RD,
} from '@/constants/images';

const MAP_RANK = {
  1: TEAM_RANKING_1ST,
  2: TEAM_RANKING_2ND,
  3: TEAM_RANKING_3RD,
};

const Rewards = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;

  const [divisionId, setDivisionId] = useState('');

  const { data: gameInfo } = useGetTemplateRule(id as string);

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

  const usdcReward = _.get(rewardJackpotLeague, 'usdcReward');

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

  return (
    <Stack spacing={5}>
      <SelectInput
        bg="primary.50 !important"
        formControlProps={{ width: ['100%', '100%', '100%', '240px'] }}
        color="black"
        style={{ color: 'black' }}
        name="league"
        choices={leagues as any}
        value={divisionId}
        onChange={(e) => setDivisionId(e.target.value)}
      />
      {usdcReward && (
        <Card p={4}>
          <Text
            fontWeight="bold"
            fontSize="2xl"
            textAlign="center"
            textTransform="uppercase"
            translateText="jackpot"
          />
          <Box
            p={2}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
            display="inline"
            width="100%"
            maxW="320px"
            mx="auto"
            my={4}
          >
            <Text fontWeight="bold" fontSize="2xl" textAlign="center">
              {usdcReward} $
            </Text>
          </Box>
          <Text
            textAlign="center"
            translateText="to_share_if_score"
            variables={{ value: _.get(rewardJackpotLeague, 'minScore') }}
          />
        </Card>
      )}
      <Card p={4}>
        <Text
          fontWeight="bold"
          fontSize="2xl"
          translateText="card_and_cash_rewards"
        />
        <DataGridWithFlex
          columns={1}
          spacing="10px"
          data={rankingPackages}
          renderItem={(item, index) => {
            const nftRewardTemplates = _.get(item, 'nftRewardTemplates', []);
            return (
              <Box key={index} mt={5}>
                <Flex gap={2}>
                  {_.get(MAP_RANK, item.rankingFrom) && (
                    <Image
                      src={_.get(MAP_RANK, item.rankingFrom)}
                      width="24px"
                      height="22px"
                    />
                  )}
                  <Text fontWeight="bold">
                    {t('rank')} {item.rankingFrom}{' '}
                    {item.rankingTo && `- ${item.rankingTo}`}
                  </Text>
                </Flex>
                <Stack
                  bgColor="gray.100"
                  p={4}
                  borderRadius="lg"
                  mt={2}
                  spacing={2}
                >
                  {item.usdcReward && (
                    <Flex fontSize={['sm', 'sm', 'md']}>
                      <Box mr={4}>✪</Box>
                      <Text>{item.usdcReward} $</Text>
                    </Flex>
                  )}
                  {_.map(nftRewardTemplates, (nftRewardTemplate, index) => {
                    const rarity = _.get(nftRewardTemplate, 'rarity');
                    const typeOfCard = _.get(nftRewardTemplate, 'typeOfCard');
                    const riderStar = _.get(nftRewardTemplate, 'riderStar');
                    const ageFrom = _.get(nftRewardTemplate, 'age.ageFrom');
                    const ageTo = _.get(nftRewardTemplate, 'age.ageTo');
                    const isShowAge = !!(ageFrom || ageTo);
                    return (
                      <Flex
                        gap={2}
                        key={index}
                        flexWrap="wrap"
                        fontSize={['sm', 'sm', 'md']}
                      >
                        <Box mr={2}>✪</Box>
                        <Image
                          src={_.get(MAP_CARD, rarity)}
                          width="20px"
                          height="26px"
                        />
                        {typeOfCard && (
                          <Text
                            textAlign="center"
                            translateText="type_of_card_value"
                            variables={{
                              value: capitalizeAndStartCase(typeOfCard),
                            }}
                          />
                        )}
                        {riderStar && (
                          <>
                            -
                            <Text
                              textAlign="center"
                              translateText="rider_star_value"
                              variables={{ value: '⭐'.repeat(riderStar) }}
                            />
                          </>
                        )}
                        {isShowAge && (
                          <>
                            -
                            <Text
                              textAlign="center"
                              translateText="age_value"
                              variables={{
                                value: `${ageFrom} → ${ageTo}`,
                              }}
                            />
                          </>
                        )}
                      </Flex>
                    );
                  })}
                </Stack>
              </Box>
            );
          }}
        />
      </Card>
    </Stack>
  );
};

export default Rewards;
