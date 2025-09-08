import { useEffect, useRef } from 'react';
import ReconnectingEventSource from 'reconnecting-eventsource';
import _ from 'lodash';

import { useGetCurrencyExchange } from './useExchange';

import { API_PATH, getApiPath } from '@/apis';
import { CurrencyExchange } from '@/typings/exchange';

type Props = {
  onDisable: () => void;
};

export const useListenFiatChange = ({ onDisable }: Props) => {
  const sseRef = useRef<ReconnectingEventSource | null>(null);
  const { data: current } = useGetCurrencyExchange();

  useEffect(() => {
    sseRef.current = new ReconnectingEventSource(
      `${getApiPath(API_PATH.SEE_EXCHANGE_RATES)}`
    );

    sseRef.current.addEventListener('message', (e) => {
      const autoExchange = _.get(current, 'autoExchange', false);
      const data: CurrencyExchange = JSON.parse(e.data);
      const currentRate = Number(
        _.get(current, autoExchange ? 'exchangeRates' : 'euroValue', 0).toFixed(
          2
        )
      );
      const newRate = Number(
        _.get(data, autoExchange ? 'exchangeRates' : 'euroValue', 0).toFixed(2)
      );

      if (currentRate !== newRate) {
        onDisable();
      }
    });
    return () => {
      sseRef.current?.close();
    };
  }, [onDisable, current]);
};
