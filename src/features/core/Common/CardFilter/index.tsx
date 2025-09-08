import React, { useEffect, useState } from 'react';
import {
  Box,
  BoxProps,
  Icon,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { MdFavorite } from 'react-icons/md';

import Auction from './Auction';
import ManagerSales from './ManagerSales';
import CheckboxWithCollapse from './CheckboxWithCollapse';
import RangeSliderWithLabel from './RangeSliderWithLabel';

import { FilterCardParams, FilterCards } from '@/typings/card';
import { SingleCheckboxInput, TextInput } from '@/components/Inputs';
import { Text } from '@/components/Common';
import { FilterBy, MarketType, OrderBy, SortBy } from '@/typings/card.enum';
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
  isMyFavorite?: boolean;
  isShowSearchInput?: boolean;
  isShowAge?: boolean;
  isShowNationality?: boolean;
  isShowMyFavorite?: boolean;
  data: FilterCardParams;
  onFilter?: (values: FilterCards) => void;
  defaultFilter?: FilterCards;
};

const CardFilter = ({
  isAuction,
  isManagerSales,
  isShowSearchInput,
  isShowAge = true,
  isShowNationality = true,
  isShowMyFavorite,
  data,
  onFilter,
  defaultFilter = {
    age: [7, 85],
    nationality: [],
    teamId: [],
    rarity: [],
    yearOfEdition: [],
    typeOfCard: [],
  },
  ...props
}: Props) => {
  const { t } = useTranslation();
  const { getParamsWithLocation } = useParamsQuery();

  const [marketType, setMarketType] = useState<MarketType>(MarketType.AUCTION);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.NEW_CARD);

  const { register, setValue, watch, getValues, reset } =
    useForm<FilterCards>();

  const { nationalities, teams, yearOfEditions, rarities, typeOfCard } = data;

  const debounceFilter = _.debounce((values) => {
    onFilter && onFilter(values);
  }, 200);

  const formControlProps = {
    getValues,
    setValue,
  };

  const handleChangeMarket = (marketType: MarketType, filterBy: FilterBy) => {
    setMarketType(marketType);
    setFilterBy(filterBy);
    setValue('marketType', marketType);
    setValue('filterBy', filterBy);
    setValue('page', 1);
    setValue('isMyFavorite', undefined);
    if (marketType === MarketType.FIXED) {
      switch (filterBy) {
        case FilterBy.LASTING_LISTING:
          setValue('sortBy', SortBy.AUCTION_END_DATE);
          setValue('orderBy', OrderBy.DESC);
          break;
        case FilterBy.BEST_VALUE:
          setValue('sortBy', SortBy.FIXED_PRICE);
          setValue('orderBy', OrderBy.ASC);
          break;
        default:
          setValue('sortBy', undefined);
          setValue('orderBy', undefined);
          break;
      }
    }
    if (marketType === MarketType.AUCTION) {
      setValue('sortBy', undefined);
      setValue('orderBy', undefined);
    }
  };

  useEffect(() => {
    const params = getParamsWithLocation();
    reset(params);
    setMarketType(params.marketType || MarketType.AUCTION);
    setFilterBy(params.filterBy || FilterBy.NEW_CARD);

    const subscription = watch((values) => {
      debounceFilter(values);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <form>
      <Box py={4} {...props}>
        {isAuction && (
          <Auction
            mt={4}
            marketType={marketType}
            filterBy={filterBy}
            onChangeMarket={handleChangeMarket}
          />
        )}
        {isManagerSales && (
          <ManagerSales
            my={8}
            marketType={marketType}
            filterBy={filterBy}
            onChangeMarket={handleChangeMarket}
          />
        )}
        <Box>
          <Text
            translateText="filters"
            fontWeight="bold"
            fontSize="xl"
            mb={2}
          />
        </Box>
        {isShowSearchInput && (
          <InputGroup mb={6}>
            <TextInput label={t('name')} pr="40px" {...register('search')} />
            <InputRightElement width="40px" top="34px" pr={2}>
              <Icon as={FiSearch} width="24px" height="24px" color="gray.400" />
            </InputRightElement>
          </InputGroup>
        )}
        {isShowMyFavorite && (
          <SingleCheckboxInput
            name="isMyFavorite"
            label=""
            icon={<Icon as={MdFavorite} />}
            isChecked={String(getValues('isMyFavorite')) === 'true'}
            onChange={(e) => setValue('isMyFavorite', e.target.checked)}
            textContent="my_favorites"
          />
        )}
        <Box mt={2}>
          <CheckboxWithCollapse
            name="rarity"
            label="scarcity"
            choices={rarities}
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
        {isShowAge && (
          <Box mt={8}>
            <RangeSliderWithLabel
              min={0}
              max={100}
              step={1}
              name="age"
              label="age"
              defaultValue={defaultFilter?.age}
              onChangeEnd={(value) => setValue('age', value)}
            />
          </Box>
        )}
        <Box mt={8}>
          <CheckboxWithCollapse
            name="yearOfEdition"
            label="year_of_edition"
            choices={yearOfEditions}
            {...formControlProps}
          />
        </Box>
        {isShowNationality && (
          <Box mt={8}>
            <CheckboxWithCollapse
              name="nationality"
              label="nationality"
              choices={nationalities}
              defaultIsOpen={false}
              {...formControlProps}
            />
          </Box>
        )}
      </Box>
    </form>
  );
};

export default CardFilter;
