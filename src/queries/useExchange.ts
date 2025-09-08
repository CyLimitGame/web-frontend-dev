import { useQuery } from 'react-query';

import { API_PATH } from '@/apis';
import { getCurrencyExchange } from '@/apis/exchange';

export const useGetCurrencyExchange = () => {
  return useQuery([API_PATH.GET_CURRENCY_EXCHANGE], getCurrencyExchange);
};
