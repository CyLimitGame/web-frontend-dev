import _ from 'lodash';

import { NextRouter } from 'next/router';

import { FILTER_LIMIT } from '@/constants/filter';
import { convertToBoolean } from '@/utils/string';
import { StartListOfRiderOption } from '@/typings/card';

export const getDefaultFilter = () => ({
  currentTeam: [],
  typeOfCard: [],
  averageCore: [0, 100],
  price: [0, 1000],
  inStartlistOf: [],
  age: [0, 100],
  nationality: [],
  season: [],
  serialNumber: [1, 300],
  team: [],
  rarity: [],
  isFavorite: false,
  isSale: false,
  searchValue: '',
  searchBy: 'name',
});

const convertData = (value: any, isNumber?: boolean) => {
  return typeof value === 'string'
    ? [value]
    : !isNumber
    ? value
    : _.map(value, (item) => Number(item));
};

export const sanitizeFilter = (values: any, defaultValues?: any) => {
  const defaultFilter = { ...getDefaultFilter(), ...defaultValues };
  const rarity = _.get(values, 'rarity', defaultFilter.rarity);
  const currentTeam = _.get(values, 'currentTeam', defaultFilter.currentTeam);
  const typeOfCard = _.get(values, 'typeOfCard', defaultFilter.typeOfCard);
  const averageCore = _.get(values, 'averageCore', defaultFilter.averageCore);
  const price = _.get(values, 'price', defaultFilter.price);
  const inStartlistOf = _.get(
    values,
    'inStartlistOf',
    defaultFilter.inStartlistOf
  );
  const age = _.get(values, 'age', defaultFilter.age);
  const nationality = _.get(values, 'nationality', defaultFilter.nationality);
  const season = _.get(values, 'season', defaultFilter.season);
  const serialNumber = _.get(
    values,
    'serialNumber',
    defaultFilter.serialNumber
  );
  const team = _.get(values, 'team', defaultFilter.team);
  const page = _.get(values, 'page', 1);
  const limit = _.get(values, 'limit', FILTER_LIMIT);
  const isFavorite = _.get(values, 'isFavorite', defaultFilter.isFavorite);
  const isSale = _.get(values, 'isSale', defaultFilter.isSale);
  const searchValue = _.get(values, 'searchValue', defaultFilter.searchValue);
  const searchBy = _.get(values, 'searchBy', defaultFilter.searchBy);
  return {
    rarity: convertData(rarity),
    currentTeam: convertData(currentTeam),
    typeOfCard: convertData(typeOfCard),
    averageCore: convertData(averageCore, true),
    price: convertData(price, true),
    inStartlistOf: convertData(inStartlistOf),
    age: convertData(age, true),
    nationality: convertData(nationality),
    season: convertData(season),
    serialNumber: convertData(serialNumber, true),
    team: convertData(team),
    page,
    limit,
    isFavorite: convertToBoolean(isFavorite),
    isSale: convertToBoolean(isSale),
    searchValue,
    searchBy,
  };
};

type SanitizeRequestOption = {
  router: NextRouter;
  riderOption: StartListOfRiderOption[];
  addFiled: (values: any) => any;
  defaultFilter?: any;
};

export const sanitizeFilterCardRequest = ({
  router,
  riderOption,
  addFiled = () => ({}),
  defaultFilter,
}: SanitizeRequestOption) => {
  const values = sanitizeFilter(router.query, defaultFilter);

  const inStartlistOf = _.get(values, 'inStartlistOf', []);

  const startListOfRiders = _.flatMap(riderOption, (item) => {
    return _.includes(_.get(values, 'inStartlistOf'), item.value)
      ? item.riderIds
      : [];
  });

  // 7d97d774040e74fb25b6fe67 it replaces the case where there are no riders
  const startList = !_.isEmpty(inStartlistOf)
    ? _.isEmpty(startListOfRiders)
      ? ['7d97d774040e74fb25b6fe67']
      : startListOfRiders
    : undefined;

  const searchValue = _.get(values, 'searchValue');

  return {
    rarity: _.get(values, 'rarity', []),
    currentTeam: _.get(values, 'currentTeam', []),
    typeOfCard: _.get(values, 'typeOfCard', []),
    fromAverageCapScore: _.get(values, 'averageCore[0]', 0),
    toAverageCapScore: _.get(values, 'averageCore[1]', 0),
    fromPrice: _.get(values, 'price[0]', 0),
    toPrice: _.get(values, 'price[1]', 0),
    startList,
    fromAge: _.get(values, 'age[0]', 0),
    toAge: _.get(values, 'age[1]', 0),
    yearOfEdition: _.get(values, 'season', []),
    fromSerialNumber: _.get(values, 'serialNumber[0]', 0),
    toSerialNumber: _.get(values, 'serialNumber[1]', 0),
    teamId: _.get(values, 'team'),
    nationality: _.get(values, 'nationality'),
    page: _.get(values, 'page', 1),
    limit: _.get(values, 'limit', FILTER_LIMIT),
    isFavorite: convertToBoolean(_.get(values, 'isFavorite')),
    searchValue: searchValue.length >= 3 ? searchValue : undefined,
    searchBy: _.get(values, 'searchBy'),
    ...addFiled(values),
  };
};
