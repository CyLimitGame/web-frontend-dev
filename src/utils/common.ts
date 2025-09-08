import _get from 'lodash/get';

import { NextRouter } from 'next/router';
import qs from 'qs';

import _ from 'lodash';

import nationality from '@/features/core/Field/Nationality/data.json';
import {
  BG_LEAGUE1,
  BG_LEAGUE2,
  BG_LEAGUE3,
  BG_LEAGUE4,
} from '@/constants/images';

export const shortAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
};

export const shortTokenId = (address: string) => {
  return `${address.slice(0, 21)}...`;
};

export const getBase64 = (
  file: File,
  onSuccess: (file: string) => void,
  onError?: (error: ProgressEvent<FileReader>) => void
) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    onSuccess(reader.result as string);
  };
  reader.onerror = function (error) {
    onError && onError(error);
  };
};

export const getNationalityName = (code: string) =>
  _get(nationality, `${`${code}`.toUpperCase()}.name`, '');

export const fixedNumber = (value: number, fractionDigits = 2) => {
  if (typeof value === undefined) {
    return Number(0).toFixed(fractionDigits);
  }
  return Number(value).toFixed(fractionDigits);
};

export const changeQueryRouter = (router: NextRouter, values: any) => {
  const query = qs.stringify(
    {
      ...router.query,
      ...values,
    },
    { arrayFormat: 'repeat' }
  );
  router.push(
    {
      pathname: router.pathname,
      query,
    },
    undefined,
    { scroll: false }
  );
};

export const getBgLeague = (league: string) => {
  const leagues = {
    'League 1': BG_LEAGUE1,
    'League 2': BG_LEAGUE2,
    'League 3': BG_LEAGUE3,
    'League 4': BG_LEAGUE4,
  };
  return _.get(leagues, league, '');
};
