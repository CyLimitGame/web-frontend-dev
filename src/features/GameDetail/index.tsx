import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';

import GameDetailTabs from './GameDetailTabs';
import RaceInfomation from './RaceInfomation';
import TeamComposition from './TeamComposition';
import Rewards from './Rewards';

import { MainLayout } from '@/layouts';
import { Container, CountdownTime, Text } from '@/components/Common';
import { useGetTemplateRule } from '@/queries/useGame';

const GameDetail = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;

  const tab = Number(_.get(router, 'query.tab', 0));

  const { data: gameInfo } = useGetTemplateRule(id as string);
  const name = _.get(gameInfo, 'name');
  const startDate = _.get(gameInfo, 'startDate', '');

  return (
    <MainLayout>
      <Container py={5}>
        <Text translateText="game_rules" fontSize="3xl" fontWeight="bold" />
        <Flex
          gap={4}
          mt={4}
          alignItems="center"
          justifyContent="space-between"
          direction={['column', 'column', 'row']}
        >
          <Text fontSize="2xl" fontWeight="bold">
            {name}
          </Text>
          <Text fontSize="sm" color="error.500" ml={2}>
            <span style={{ marginRight: 10 }}>{t('start_in')}:</span>
            <CountdownTime date={startDate} />
          </Text>
        </Flex>
        <GameDetailTabs />
        <Box mt={5}>
          {tab === 0 && <RaceInfomation />}
          {tab === 1 && <TeamComposition />}
          {tab === 2 && <Rewards />}
        </Box>
      </Container>
    </MainLayout>
  );
};

export default GameDetail;
