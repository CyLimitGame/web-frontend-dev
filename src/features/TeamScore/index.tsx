import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';

import { TeamScoreCard } from '@/features/core/Cards';
import { getFullName } from '@/utils/user';
import { MainLayout } from '@/layouts';
import { Container, DataGrid, Text } from '@/components/Common';
import useParamsQuery from '@/hooks/useGetParams';
import {
  sortListNftByRole,
  useGetGameController,
  useGetGameRankingTeamsScore,
} from '@/queries/useGame';
import { formatPrice } from '@/utils/number';
import { BaseButton } from '@/components/Button';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';

const TeamScore = () => {
  const { getParam } = useParamsQuery();
  const teamId = getParam('id');
  const divisionId = getParam('league');

  const { t } = useTranslation();

  const { data } = useGetGameRankingTeamsScore(teamId);
  const { data: gameController } = useGetGameController(data?.gameId as string);

  const naCards = _.get(data, 'naCards', []);
  const freeCards = _.get(data, 'freeCards', []);
  const nfts = _.get(data, 'nfts', []);

  const cards = [...nfts, ...naCards, ...freeCards];
  const totalPoint = _.get(data, 'totalPoint', 0);

  return (
    <MainLayout>
      <Container py={5} maxW="1440px">
        <Flex
          flexDirection={['column', 'column', 'row']}
          justifyContent="space-between"
          mb={[5, 5, 10]}
          gap={4}
        >
          <Box>
            <Text
              translateText="team_score"
              fontSize={['2xl', '2xl', '4xl']}
              fontWeight="bold"
              color="gray.900"
              mt={2}
            />
            <Text fontSize="lg" fontWeight="bold" color="gray.900">
              {gameController?.name}
            </Text>
          </Box>
          <Flex
            minW="192px"
            minH="166px"
            color="pink.300"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            boxShadow="md"
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            px={8}
          >
            <Text fontWeight="bold" fontSize="4xl">
              {formatPrice(totalPoint)}
            </Text>
            <Text translateText="total_points" fontSize="lg" />
          </Flex>
        </Flex>
        <Text fontWeight="bold" textAlign="center" fontSize="2xl" mb={5}>
          {getFullName(data?.createdBy)}
        </Text>
        <DataGrid
          columns={[2, 2, 3, _.size(cards)]}
          gap={[2, 2, 3, 1]}
          data={sortListNftByRole(cards)}
          renderItem={(item) => (
            <TeamScoreCard key={item.id} item={item} results={data?.results} />
          )}
        />
        <Flex justifyContent="center" mt={5}>
          <BaseButton
            variant="light"
            onClick={() =>
              navigateTo(`${PATH.GAME_RANKINGS}/${data?.gameId}`, {
                league: divisionId,
              })
            }
          >
            {t('back_to_leaderboard')}
          </BaseButton>
        </Flex>
      </Container>
    </MainLayout>
  );
};

export default TeamScore;
