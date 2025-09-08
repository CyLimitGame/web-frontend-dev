import React from 'react';
import { Box } from '@chakra-ui/react';
import _ from 'lodash';

import EditThisTeamButton from './EditThisTeamButton';

import { MyTeamCard } from '@/features/core/Cards';
import { Container, DataGrid, Text } from '@/components/Common';
import {
  addIndexForNftsByRole,
  coverFreeElectron,
  getCardsMyTeam,
  useGetGameController,
  useGetGameTeams,
} from '@/queries/useGame';
import { CardItem } from '@/typings/card';

type Props = {
  isOnlyShow?: boolean;
  gameId: string;
};

const TeamCreated = ({ isOnlyShow = false, gameId }: Props) => {
  const { data: gameController } = useGetGameController(gameId);
  const isOnedayrace = !!_.get(gameController, 'race.is_onedayrace');

  const { data: gameTeam } = useGetGameTeams(gameId);

  const rules = _.get(gameController, 'rule.roles', []);
  const divisions = _.get(gameController, 'rule.leagues', []);

  return (
    <Container maxW="1440px">
      <Text
        fontWeight="bold"
        fontSize="3xl"
        mb={[0, 0, 2]}
        py={4}
        translateText="teams_created"
      />
      {gameTeam?.teams?.map((item: any, index: number) => {
        const nfts = _.get(item, 'nfts', []);
        const freeCards = _.get(item, 'freeCards', []);
        const naCards = _.get(item, 'naCards', []);
        const divisionId = _.get(item, 'divisionId', '');
        const captainId = _.get(item, 'captainId', '');
        const teamId = _.get(item, 'id', '');
        const cards = coverFreeElectron([...nfts, ...freeCards, ...naCards]);

        const cardsWithIndex = addIndexForNftsByRole(rules, cards);

        const division = _.find(divisions, (div) => div.id === divisionId);

        const list = isOnlyShow ? cards : getCardsMyTeam(rules, cardsWithIndex);

        const columns = _.size(cardsWithIndex);

        return (
          <Box key={index} mb={10}>
            <Text fontWeight="bold" fontSize="2xl" mb={2}>
              {division?.name}
            </Text>
            <DataGrid
              columns={[2, 2, 3, columns]}
              gap={1}
              data={list}
              renderItem={(item) => (
                <MyTeamCard
                  key={item.id}
                  item={item}
                  captainId={captainId}
                  isOnedayrace={isOnedayrace}
                />
              )}
            />
            {!isOnlyShow && (
              <EditThisTeamButton
                divisionId={divisionId}
                nfts={cardsWithIndex as CardItem[]}
                teamId={teamId}
                captainId={captainId}
                divisionName={division?.name as string}
              />
            )}
          </Box>
        );
      })}
    </Container>
  );
};

export default TeamCreated;
