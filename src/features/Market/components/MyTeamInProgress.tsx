import React, { useState } from 'react';
import { Box, Text, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';
import moment from 'moment';

import { myTeamColumns } from '../data';

import { GameStatus } from '@/typings/game.enum';
import { useGetMyGameTeam } from '@/queries/useGame';
import TableInfo from '@/features/core/Table/TableInfo';
import MyTeamByLeagueModal from '@/features/core/Modal/MyTeamByLeagueModal';
import { useGameContext } from '@/features/Game/GameContext';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';

const LIMIT = 10;

const MyTeamInProgress = () => {
  const { setGameContext } = useGameContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [team, setTeam] = useState<any>({});
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const { data, isLoading, isFetching } = useGetMyGameTeam(
    {
      page,
      limit: LIMIT,
      status: [GameStatus.COMMING, GameStatus.INPROGRESS],
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  if (!data || (page === 1 && data.items?.length === 0)) return null;

  const handleView = (team: any) => {
    if (moment().isAfter(team.game.startDate)) {
      setGameContext({
        gameId: team.game.id,
        isOpenModal: true,
        activeIndex: 3,
        divisionId: team.divisionId,
      });
      return navigateTo(
        `${PATH.GAME}?status=in_progress&gameMode=${team.game.gameMode}&page=1`
      );
    }
    setTeam(team);
    onOpen();
  };

  return (
    <Box>
      <Text
        textTransform="uppercase"
        fontStyle="normal"
        fontWeight="bold"
        fontSize={['16px', '22px', '28px']}
        mb="12px"
      >
        {t('my_teams')}
      </Text>
      <TableInfo
        isLoading={isLoading || isFetching}
        data={data?.items || []}
        formatCell={myTeamColumns}
        mb="34px"
        metaData={{
          onView: handleView,
        }}
        tableContainerProps={{
          overflowX: 'auto',
          sx: {
            '&>table': {
              minW: '600px',
            },
          },
        }}
        pagination={{
          total: data?.total || 0,
          limit: LIMIT,
          page,
          onChangePage: setPage,
        }}
      />
      <MyTeamByLeagueModal
        isOpen={isOpen}
        onClose={onClose}
        divisionId={_.get(team, 'divisionId')}
        gameId={_.get(team, 'gameId')}
        onChangeLeague={(id) =>
          setTeam(
            _.find(
              data.items,
              (item) =>
                item.gameId === _.get(team, 'gameId') && item.divisionId === id
            )
          )
        }
      />
    </Box>
  );
};

export default MyTeamInProgress;
