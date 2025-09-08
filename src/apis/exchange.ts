import { API_PATH } from './api-path';

import request from '@/utils/request';
import { CurrencyExchange } from '@/typings/exchange';

export const getCurrencyExchange = (): Promise<CurrencyExchange> => {
  return request.get(API_PATH.GET_CURRENCY_EXCHANGE);
};
