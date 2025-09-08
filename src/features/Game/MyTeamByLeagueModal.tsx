import React, { useContext } from 'react';
import { Box, Center, Divider, useBreakpointValue } from '@chakra-ui/react';
import _ from 'lodash';

import { GameContext } from './GameContext';

import { DeleteTeamButton, EditTeamButton } from '@/features/core/Button';
import { BaseCard } from '@/features/core/Cards';
import { CardRole, Leagues } from '@/features/core/Common';
import { BaseModal } from '@/components/Modal';
import { useGetGameTeams, useGetTemplateRule } from '@/queries/useGame';
import {
  Captain,
  CardImageLoader,
  CylimitLogo,
  DataGridWithFlex,
  Text,
} from '@/components/Common';
import { getBgLeague } from '@/utils/common';

type Props = {
  gameId: string;
};
const MyTeamByLeagueModal = ({ gameId }: Props) => {
  const { gameContext, setGameContext } = useContext(GameContext);
  const { data: game } = useGetTemplateRule(gameId);
  const { data: gameTeam } = useGetGameTeams(gameId);

  const image = _.get(game, 'imageUrl', '');
  const leagues = _.get(game, 'rule.leagues', []);
  const divisionName = _.get(
    _.find(leagues, (item) => item.divisionId === gameContext.divisionId),
    'division.name'
  );

  const team = _.find(
    gameTeam?.teams,
    (team) => team.divisionId === gameContext.divisionId
  );

  const cards = _.get(team, 'cards', []);
  const teamId = _.get(team, 'id', '');
  const captainId = _.get(team, 'captainId', '');

  const columns = useBreakpointValue({ base: 3, xs: 3, sm: 3, md: 5 });

  return (
    <BaseModal
      isOpen={!!gameContext.isOpenMyTeam}
      onClose={() => setGameContext({ isOpenMyTeam: false })}
      closeable
      size="4xl"
    >
      <Box
        m={-6}
        p={4}
        bgImage={getBgLeague(divisionName)}
        backgroundSize="cover"
      >
        <Center p={[2, 2, 0]}>
          <Leagues
            data={_.filter(leagues, (league) =>
              _.includes(
                _.get(gameTeam, 'teamDivisionIds', []),
                league.divisionId
              )
            )}
            divisionId={gameContext.divisionId as string}
            divisionIds={[]}
            onChange={(id) => setGameContext({ divisionId: id })}
            flexWrap="wrap"
          />
        </Center>
        <Box mx="-40px">
          <Divider my={2} />
        </Box>
        <Center>
          <Text
            translateText="my_team"
            textTransform="uppercase"
            fontWeight="bold"
            fontSize={['md', 'lg', '2xl']}
          />
          <Box w={['140px', '160px', '200px']} ml={4} mr={2}>
            <CardImageLoader src={image} aspectRatio="2" />
          </Box>
          <CylimitLogo w={['120px', '120px', '160px']} />
        </Center>
        <Box mt={4}>
          <DataGridWithFlex
            spacing="12px"
            columns={columns as number}
            data={cards}
            renderItem={(item) => {
              return (
                <Box>
                  <CardRole role={item.role} roles={cards} />
                  <Box pos="relative">
                    {captainId === item.id && <Captain />}
                    <BaseCard data={item} />
                  </Box>
                </Box>
              );
            }}
            containerProps={{ justifyContent: 'center' }}
          />
        </Box>
        <Center gap={2} p={4}>
          <EditTeamButton
            gameId={gameId}
            divisionId={gameContext.divisionId as string}
          />
          <DeleteTeamButton
            teamId={teamId}
            onSuccess={() => setGameContext({ isOpenMyTeam: false })}
          />
        </Center>
      </Box>
    </BaseModal>
  );
};

export default MyTeamByLeagueModal;
