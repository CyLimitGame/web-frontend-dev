import { useContext } from 'react';
import React from 'react';
import { Box } from '@chakra-ui/react';
import _ from 'lodash';
import moment from 'moment';

import GameCard from './GameCard';
import InfoModal from './InfoModal';
import { GameContext } from './GameContext';

import MyTeamByLeagueModal from './MyTeamByLeagueModal';

import { DataGrid, GameCardSkeleton } from '@/components/Common';
import { Pagination } from '@/components/Common';
import useParamsQuery from '@/hooks/useGetParams';
import { PATH } from '@/constants/path';
import { navigateTo } from '@/utils/navigation';
import { useGetGames } from '@/queries/useGame';
import { GameStatus } from '@/typings/game.enum';
import { FILTER_LIMIT } from '@/constants/filter';

const GameData = () => {
  const { gameContext, setGameContext } = useContext(GameContext);
  const { getParamsWithLocation } = useParamsQuery();

  const params = getParamsWithLocation();
  const { page, status, gameMode } = params || {};

  const { data, isFetching } = useGetGames({
    page,
    status: status || GameStatus.COMMING,
    gameMode: gameMode || 'cap',
  });

  const handleChangePage = (pageValue: number) => {
    navigateTo(PATH.GAME, { ...params, page: pageValue }, { scroll: false });
  };

  // Hardcode push game with name = 'giro' to the first
  const getData = () => {
    const list = data?.items || [];
    const giroIndex = _.findIndex(list, (obj) =>
      _.isEqual(_.toLower(obj.name), 'giro')
    );

    if (giroIndex !== -1) {
      const isComing = moment(list[giroIndex].endDate).isBefore(moment());
      if (!isComing) {
        const giroObject = list[giroIndex];
        list.splice(giroIndex, 1);
        list.unshift(giroObject);
      }
    }
    return list;
  };

  const onClickGameInfo = (gameId: string) => {
    setGameContext({
      isOpenModal: true,
      gameId,
      divisionId: '',
      activeIndex: 0,
    });
  };

  return (
    <Box py={9}>
      <DataGrid
        data={getData()}
        gap={4}
        columns={[1, 1, 1, 2]}
        isLoading={isFetching}
        type="common"
        renderItem={(item) => (
          <GameCard item={item} onClickInfo={onClickGameInfo} />
        )}
        numberOfSkeleton={FILTER_LIMIT}
        renderSkeleton={() => <GameCardSkeleton />}
      />
      <Pagination
        page={page || 1}
        total={data?.total || 0}
        limit={12}
        onChangePage={handleChangePage}
      />
      <InfoModal
        isOpen={!!gameContext.isOpenModal}
        onClose={() => setGameContext({ isOpenModal: false })}
        gameId={gameContext.gameId as string}
      />
      <MyTeamByLeagueModal gameId={gameContext.gameId as string} />
    </Box>
  );
};

export default GameData;
