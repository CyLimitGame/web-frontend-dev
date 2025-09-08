import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import _ from 'lodash';

import { SingleCheckboxInput, TextInput } from '@/components/Inputs';
import { Rarities } from '@/constants/select';
import { Pagination } from '@/typings/common';
import { useGetActualTeams } from '@/queries/useGame';
import { CustomSelect } from '@/components/Inputs/SelectInput';

export type FilterData = Pagination & {
  name: string;
  rarity: string[];
  isUsedStartList?: boolean;
  actualTeam: string[];
  typeOfCard: string;
};

type Props = {
  onFilter: (values: FilterData) => void;
  filterValues: FilterData;
  gameId: string;
  activeRarity: string[];
};

const Filter = ({ onFilter, filterValues, gameId, activeRarity }: Props) => {
  const { t } = useTranslation();

  const { register, watch, reset, setValue } = useForm<FilterData>({
    defaultValues: {
      isUsedStartList: false,
      name: '',
      actualTeam: [],
      rarity: [],
    },
  });

  const onSubmitData = useCallback(
    _.debounce((data) => {
      onFilter(data);
    }, 500),
    []
  );

  const name = watch('name');
  const isUsedStartList = watch('isUsedStartList');
  const actualTeam = watch('actualTeam');
  const rarity = watch('rarity');
  const typeOfCard = watch('typeOfCard');

  const { data: actualTeams } = useGetActualTeams({
    rarity,
    isUsedStartList: isUsedStartList || undefined,
    gameId,
  });

  const memoryData = useMemo(() => {
    return JSON.stringify([
      name,
      isUsedStartList,
      actualTeam,
      rarity,
      typeOfCard,
    ]);
  }, [name, isUsedStartList, actualTeam, rarity, typeOfCard]);

  useEffect(() => {
    onSubmitData({
      name,
      isUsedStartList,
      actualTeam,
      rarity: rarity || undefined,
      typeOfCard,
    });
  }, [memoryData]);

  useEffect(() => {
    reset(filterValues);
  }, []);

  useEffect(() => {
    setValue('rarity', activeRarity);
    setValue('actualTeam', []);
  }, [activeRarity]);

  return (
    <Box>
      <Flex
        gap={2}
        flexDirection={['column', 'column', 'column', 'row']}
        flexWrap="wrap"
      >
        <Box w={['100%', '100%', '100%', '260px']}>
          <TextInput label={t('name')} size="md" {...register('name')} />
        </Box>
        <CustomSelect
          label="rarity"
          formControlProps={{ width: ['100%', '100%', '100%', '260px'] }}
          value={rarity || []}
          isMulti
          isRequire
          options={_.filter(Rarities, (item) =>
            _.includes(activeRarity, item.value)
          )}
          {...register('rarity')}
          onChange={(e) => {
            register('rarity').onChange(e);
            setValue('actualTeam', []);
          }}
        />
        <CustomSelect
          label="team"
          formControlProps={{ width: ['100%', '100%', '100%', '260px'] }}
          value={actualTeam}
          isMulti
          isClear
          options={actualTeams || []}
          {...register('actualTeam')}
        />
        <SingleCheckboxInput
          label="pcs_startlist"
          textContent="riders_on_startlist"
          formControlProps={{ width: '220px' }}
          tooltipText="we_update_the_startlist_every_hour"
          {...register('isUsedStartList')}
        />
      </Flex>
    </Box>
  );
};

export default React.memo(Filter);
