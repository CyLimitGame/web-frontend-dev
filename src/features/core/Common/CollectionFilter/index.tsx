import React, { useEffect } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import _ from 'lodash';

import CheckboxWithCollapse from './CheckboxWithCollapse';

import { FilterCardParams, FilterCards } from '@/typings/card';
import { Text } from '@/components/Common';
import useParamsQuery from '@/hooks/useGetParams';

export const defaultFilter: FilterCards = {
  age: [7, 85],
  nationality: [],
  teamId: [],
  rarity: [],
  yearOfEdition: [],
  typeOfCard: [],
};

type Props = BoxProps & {
  isAuction?: boolean;
  isManagerSales?: boolean;
  isShowSearchInput?: boolean;
  isShowAge?: boolean;
  isShowNationality?: boolean;
  data: FilterCardParams;
  onFilter?: (values: FilterCards) => void;
};

const CollectionFilter = ({ data, onFilter, ...props }: Props) => {
  const { getParamsWithLocation } = useParamsQuery();

  const { setValue, watch, getValues, reset } = useForm<FilterCards>();

  const { teams, yearOfEditions, rarities, typeOfCard } = data;

  const debounceFilter = _.debounce((values) => {
    onFilter && onFilter(values);
  }, 200);

  const formControlProps = {
    getValues,
    setValue,
  };

  useEffect(() => {
    const params = getParamsWithLocation();
    reset(params);

    const subscription = watch((values) => {
      debounceFilter(values);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <form>
      <Box py={4} {...props}>
        <Box>
          <Text
            translateText="filters"
            fontWeight="bold"
            fontSize="xl"
            mb={2}
          />
        </Box>
        <Box mt={8}>
          <CheckboxWithCollapse
            name="rarity"
            label="scarcity"
            choices={rarities}
            {...formControlProps}
          />
        </Box>
        <Box mt={8}>
          <CheckboxWithCollapse
            name="yearOfEdition"
            label="year_of_edition"
            choices={yearOfEditions}
            {...formControlProps}
          />
        </Box>
        <Box mt={8}>
          <CheckboxWithCollapse
            name="typeOfCard"
            label="type_of_card"
            choices={typeOfCard}
            {...formControlProps}
          />
        </Box>
        <Box mt={8}>
          <CheckboxWithCollapse
            name="teamId"
            label="team"
            choices={teams}
            {...formControlProps}
          />
        </Box>
      </Box>
    </form>
  );
};

export default CollectionFilter;
