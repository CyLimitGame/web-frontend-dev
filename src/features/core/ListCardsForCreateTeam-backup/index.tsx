// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from 'react';
import _ from 'lodash';
import { Box } from '@chakra-ui/react';

import Filter, { FilterData } from './Filter';

import { DataGrid, FilterWithDrawer, Pagination } from '@/components/Common';
import { CardItem } from '@/typings/card';
import { CreateTeamCard } from '@/features/core/Cards';
import { useGetGameController, useGetGameNfts } from '@/queries/useGame';
import useParamsQuery from '@/hooks/useGetParams';
import { useGetUserProfile } from '@/queries/useUser';
import { Division } from '@/typings/game';

type Props = {
  cardSelectedIds: string[];
  onSelectCard: (value: CardItem) => void;
  riderIds: string[];
  disabledChoose: boolean;
  includedTeamId?: string;
  divisionId?: string;
  divisions?: Division[];
  columns: number;
};

const ListCardsForCreateTeam = ({
  cardSelectedIds,
  onSelectCard,
  riderIds,
  disabledChoose,
  includedTeamId,
  divisionId,
  divisions,
  columns,
}: Props) => {
  const { data: userProfile } = useGetUserProfile();
  const { getParam } = useParamsQuery();

  const [filterValues, setFilterValues] = useState<FilterData>({
    name: '',
    page: 1,
    isUsedStartList: true,
    actualTeam: '',
    rarity: [],
    typeOfCard: 'my_team',
  });

  const gameId = getParam('id');
  const userId = _.get(userProfile, 'id', '');
  const { data, isLoading } = useGetGameNfts({
    ...filterValues,
    limit: columns,
    gameId,
    userId,
    includedTeamId,
  });
  const { data: gameController } = useGetGameController(gameId);

  const gameNfts = data?.items || [];

  const handleFilter = (values: FilterData) => {
    setFilterValues((current) => ({ ...current, ...values, page: 1 }));
  };

  const handleChangePage = (page: number) => {
    setFilterValues((current) => ({ ...current, page }));
  };

  return (
    <>
      <Box mb={2}>
        <Box display={['none', 'none', 'none', 'block']}>
          <Filter
            onFilter={handleFilter}
            filterValues={filterValues}
            gameId={gameId}
            startListExternalUrl={_.get(
              gameController,
              'startListExternalUrl',
              ''
            )}
            divisionId={divisionId}
            divisions={divisions}
          />
        </Box>
        <Box display={['block', 'block', 'block', 'none']}>
          <FilterWithDrawer
            buttonProps={{ top: '72px', size: 'sm', left: 'none', right: -10 }}
          >
            <Filter
              onFilter={handleFilter}
              filterValues={filterValues}
              gameId={gameId}
              startListExternalUrl={_.get(
                gameController,
                'startListExternalUrl',
                ''
              )}
              divisionId={divisionId}
              divisions={divisions}
            />
          </FilterWithDrawer>
        </Box>
      </Box>

      <Box mt={[2, 2, 5]}>
        <DataGrid
          columns={[2, 2, 3, columns]}
          gap={1}
          data={gameNfts}
          isLoading={isLoading}
          renderItem={(item) => (
            <CreateTeamCard
              key={item.id}
              item={item}
              selected={cardSelectedIds.includes(item.id)}
              onSelectCard={() => onSelectCard(item)}
              disabled={
                disabledChoose || riderIds.includes(item.rider?.id as string)
              }
            />
          )}
        />
      </Box>
      <Box height="40px" mt={4}>
        <Pagination
          page={filterValues.page || 1}
          total={data?.total || 0}
          limit={columns || 5}
          onChangePage={handleChangePage}
        />
      </Box>
    </>
  );
};

export default ListCardsForCreateTeam;
