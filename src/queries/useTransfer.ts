import { useEffect, useRef } from 'react';
import { useQueryClient } from 'react-query';
import ReconnectingEventSource from 'reconnecting-eventsource';

import { useGetUserProfile } from './useUser';

import { API_PATH, getApiPath } from '@/apis';
import { TransferStatus } from '@/typings/card.enum';

export type UseListenPaymentResponse = {
  nftId: string;
  status: TransferStatus;
  topic: string;
  type: string;
};

export const useListenTransferStatus = () => {
  const sseRef = useRef<ReconnectingEventSource | null>(null);
  const queryClient = useQueryClient();
  const { data: userInfo } = useGetUserProfile();

  useEffect(() => {
    if (!userInfo?.id) {
      return;
    }

    sseRef.current = new ReconnectingEventSource(
      `${getApiPath(`${API_PATH.LISTEN_TRANSFER}/${userInfo.id}`)}`
    );

    sseRef.current.addEventListener('message', (e) => {
      const data: UseListenPaymentResponse = JSON.parse(e.data);
      if (data.status) {
        queryClient.invalidateQueries([API_PATH.GET_MY_NFTS]);
        queryClient.invalidateQueries([API_PATH.GET_CARD, data.nftId]);
      }
    });

    return () => {
      sseRef.current?.close();
    };
  }, [userInfo?.id]);
};
