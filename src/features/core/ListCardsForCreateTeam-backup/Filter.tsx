import React, { useCallback, useEffect } from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import _ from 'lodash';

import { Text } from '@/components/Common';
import {
  SelectInput,
  SingleCheckboxInput,
  TextInput,
} from '@/components/Inputs';
import { Rarities, TypeOfCards } from '@/constants/select';
import { Division } from '@/typings/game';
import { Pagination } from '@/typings/common';
import { PCS_LOGO } from '@/constants/images';
import { useGetActualTeams } from '@/queries/useGame';
import { CustomSelect } from '@/components/Inputs/SelectInput';

const NFT_RARITIES = ['blue', 'pink', 'yellow'];
const FREE_CARD_RARITIES = ['white'];

export type FilterData = Pagination & {
  name: string;
  rarity: string[];
  isUsedStartList?: boolean;
  actualTeam: string;
  typeOfCard: string;
};

type Props = {
  onFilter: (values: FilterData) => void;
  startListExternalUrl: string;
  filterValues: FilterData;
  gameId: string;
  divisionId?: string;
  divisions?: Division[];
};

const Filter = ({
  onFilter,
  startListExternalUrl,
  filterValues,
  gameId,
  divisionId,
  divisions,
}: Props) => {
  const { t } = useTranslation();

  const { register, watch, reset, setValue } = useForm<FilterData>({
    defaultValues: {
      isUsedStartList: false,
      name: '',
      actualTeam: '',
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
    rarity: typeOfCard === 'my_team' ? rarity : 'trainee',
    isUsedStartList: isUsedStartList || undefined,
    gameId,
  });

  const handleOpenStartListExternalUrl = () => {
    startListExternalUrl && window.open(startListExternalUrl, '_blank');
  };

  useEffect(() => {
    onSubmitData({
      name,
      isUsedStartList,
      actualTeam,
      rarity: rarity || undefined,
      typeOfCard,
    });
  }, [name, isUsedStartList, actualTeam, rarity, typeOfCard]);

  useEffect(() => {
    reset(filterValues);
  }, []);

  useEffect(() => {
    if (divisionId && divisions) {
      const division = _.find(divisions, (item) => item.id === divisionId);
      setValue('actualTeam', '');
      setValue(
        'rarity',
        division?.name === 'League 4' ? FREE_CARD_RARITIES : NFT_RARITIES
      );
    }
  }, [divisionId, divisions]);

  return (
    <Box>
      <Flex justifyContent="space-between" mb={[10, 10, 10, 0]}>
        <Text
          translateText="filter"
          fontSize="xl"
          color="gray.400"
          fontWeight="bold"
          mt={5}
        />
        <Image
          src={PCS_LOGO}
          w="100px"
          cursor="pointer"
          onClick={handleOpenStartListExternalUrl}
        />
      </Flex>
      <Flex
        gap={2}
        flexDirection={['column', 'column', 'column', 'row']}
        flexWrap="wrap"
      >
        <Box w={['100%', '100%', '100%', '260px']}>
          <TextInput label={t('name')} size="md" {...register('name')} />
        </Box>
        <SelectInput
          label={t('type')}
          choices={TypeOfCards}
          bg="primary.50 !important"
          formControlProps={{ width: ['100%', '100%', '100%', '260px'] }}
          color="black"
          style={{ color: 'black' }}
          {...register('typeOfCard')}
          onChange={(e) => {
            register('typeOfCard').onChange(e);
            setValue('actualTeam', '');
            setValue('rarity', []);
          }}
        />
        {typeOfCard === 'my_team' && (
          <CustomSelect
            label="rarity"
            formControlProps={{ width: ['100%', '100%', '100%', '260px'] }}
            value={rarity || []}
            isMulti
            options={Rarities}
            {...register('rarity')}
            onChange={(e) => {
              register('rarity').onChange(e);
              setValue('actualTeam', '');
            }}
          />
        )}
        <SelectInput
          label={t('team')}
          choices={actualTeams || []}
          bg="primary.50 !important"
          formControlProps={{ width: ['100%', '100%', '100%', '260px'] }}
          color="black"
          style={{ color: 'black' }}
          showEmptyOption
          {...register('actualTeam')}
        />
        <SingleCheckboxInput
          label="pcs_startlist"
          textContent="riders_on_startlist"
          formControlProps={{ width: '280px' }}
          tooltipText="we_update_the_startlist_every_hour"
          {...register('isUsedStartList')}
        />
      </Flex>
    </Box>
  );
};

export default Filter;
