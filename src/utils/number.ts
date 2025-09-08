import _ from 'lodash';

import { CurrencyExchange } from '@/typings/exchange';

export const formatPrice = (value: number, decimal?: number) => {
  const numberOfdecimal = typeof decimal !== 'undefined' ? decimal : 2;
  const roundedPrice = _.round(value, numberOfdecimal);
  if (Number.isInteger(roundedPrice)) {
    return roundedPrice.toString();
  }
  return roundedPrice.toFixed(numberOfdecimal);
};

export const getEuroPrice = (price: number, exchange?: CurrencyExchange) => {
  const autoExchange = _.get(exchange, 'autoExchange', false);
  const euroValue = _.get(exchange, 'euroValue', 0);
  const usdValue = _.get(exchange, 'usdValue', 0);
  const exchangeRates = _.get(exchange, 'exchangeRates', 0);

  return autoExchange ? price * exchangeRates : (price * euroValue) / usdValue;
};

export const getUsdPrice = (
  eurExpected: number,
  exchange?: CurrencyExchange
) => {
  const autoExchange = _.get(exchange, 'autoExchange', false);
  const euroValue = _.get(exchange, 'euroValue', 0);
  const usdValue = _.get(exchange, 'usdValue', 0);
  const exchangeRates = _.get(exchange, 'exchangeRates', 0);

  const result = autoExchange
    ? eurExpected / exchangeRates
    : (eurExpected * usdValue) / euroValue;

  return Number(formatPrice(result));
};
