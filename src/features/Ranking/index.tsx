import React, { useEffect } from 'react';
import { Box, Checkbox, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';
import { useRouter } from 'next/router';

import Banner from './Banner';
import TeamCreatedButton from './TeamCreatedButton';
import RankingTable from './RankingTable';

import { TeamCompositionRuleButton } from '@/features/core/Button';
import { MainLayout } from '@/layouts';
import { Container, Pagination, Text } from '@/components/Common';
import { SelectInput } from '@/components/Inputs';
import {
  useGetGameConfig,
  useGetGameController,
  useGetGameRankings,
} from '@/queries/useGame';
import useParamsQuery from '@/hooks/useGetParams';
import { PATH } from '@/constants/path';
import { GAME_MODES } from '@/constants/select';

const PAGE_LIMIT = 12;

const Ranking = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { getParam } = useParamsQuery();
  const gameId = getParam('id');
  const divisionId = getParam('league');
  const isFriend = getParam('isFriend');

  const { getParamsWithLocation } = useParamsQuery();
  const params = getParamsWithLocation();
  const page = _.get(params, 'page', 1);

  const { data, isLoading } = useGetGameRankings({
    gameId,
    divisionId,
    page,
    limit: PAGE_LIMIT,
    isFriend: isFriend === 'true' ? true : undefined,
  });

  const { data: gameController } = useGetGameController(gameId);
  const { data: gameConfig } = useGetGameConfig();

  const name = _.get(gameController, 'name', '');
  const isUsingLiveRanking = _.get(gameController, 'isUsingLiveRanking', false);
  const divisions = gameController
    ? _.get(gameController, 'rule.leagues', _.get(gameConfig, 'divisions', []))
    : [];
  const gameMode = _.get(gameController, 'gameMode');

  const items = data?.items || [];
  const total = data?.total || 0;

  const handleChangeLeague = (value: string) => {
    router.push(
      `${PATH.GAME_RANKINGS}/${gameId}?league=${value}&page=1&isFriend=${isFriend}`
    );
  };

  const handleChangePage = (value: number) => {
    router.push(
      `${PATH.GAME_RANKINGS}/${gameId}?league=${divisionId}&page=${value}&&isFriend=${isFriend}`
    );
  };

  const handleChangeFriend = (checked: boolean) => {
    router.push(
      `${PATH.GAME_RANKINGS}/${gameId}?league=${divisionId}&page=1&isFriend=${checked}`
    );
  };

  useEffect(() => {
    if (gameId && !_.isEmpty(divisions) && !divisionId) {
      router.replace(
        `${PATH.GAME_RANKINGS}/${gameId}?league=${divisions[0].id}`,
        undefined,
        { shallow: true }
      );
    }
  }, [divisions]);

  return (
    <MainLayout>
      <Container maxWidth={1200} pt={[0, 0, 0, 5]}>
        <Flex
          flexDirection={['column', 'column', 'column', 'row']}
          justifyContent="space-between"
          mt={4}
        >
          <Box>
            <Text
              translateText="team_ranking"
              fontSize={['2xl', '2xl', '4xl']}
              fontWeight="bold"
              color="gray.900"
            />
            <Box mt={2}>
              <TeamCompositionRuleButton gameId={gameId} />
            </Box>
            <Box my={[4, 4, 3]}>
              <Text fontSize="lg" fontWeight="bold" color="gray.900">
                {name}
              </Text>
              <Text
                fontSize="sm"
                color="gray.500"
                maxW="300px"
                translateText={
                  isUsingLiveRanking
                    ? 'we_update_the_ranking_every_15_minutes'
                    : 'we_receive_the_PCS_results'
                }
              />
            </Box>
          </Box>
          <Flex gap={2} flexDirection={['column', 'column', 'row']}>
            <Flex gap={2}>
              <SelectInput
                label={t('championship')}
                name="championship"
                choices={GAME_MODES}
                bg="primary.50 !important"
                color="black"
                formControlProps={{ width: '240px' }}
                style={{ color: 'black' }}
                value={gameMode}
                isDisabled
              />
              <SelectInput
                label={t('league')}
                name="divisionId"
                choices={divisions}
                bg="primary.50 !important"
                color="black"
                formControlProps={{ width: '240px' }}
                style={{ color: 'black' }}
                value={divisionId}
                onChange={({ target: { value } }) => handleChangeLeague(value)}
              />
            </Flex>
            <Box>
              <TeamCreatedButton gameId={gameId} />
              <Flex mt={2}>
                <Checkbox
                  isChecked={isFriend === 'true'}
                  onChange={({ target: { checked } }) =>
                    handleChangeFriend(checked)
                  }
                >
                  {t('my_friend')}
                </Checkbox>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Container>
      <Banner
        gameId={gameId}
        divisionId={divisionId}
        name={_.get(gameController, 'name', '')}
      />

      <Box m="auto" maxW="860px" w="100%" mb={10} position="relative" px={2}>
        <Box
          bg="white"
          shadow="lg"
          marginTop={[10, 10, 10, '-60px']}
          position="relative"
          borderRadius="2xl"
        >
          <RankingTable
            data={items}
            divisionId={divisionId}
            gameId={gameId}
            page={page - 1}
            isFriend={isFriend}
            isLoading={isLoading}
          />
        </Box>

        <Pagination
          page={page}
          total={total}
          limit={PAGE_LIMIT}
          onChangePage={handleChangePage}
        />
      </Box>
    </MainLayout>
  );
};

export default Ranking;
