import { useEffect, useRef } from 'react';
import ReconnectingEventSource from 'reconnecting-eventsource';

import { useGetUserProfile } from './useUser';

import { getTemplatePath } from '@/utils/string';
import { API_PATH, getApiPath } from '@/apis';

export const useListenLevelUp = ({
  onSuccess,
}: {
  onSuccess: (data: any) => void;
}) => {
  const sseRef = useRef<ReconnectingEventSource | null>(null);
  const { data: userInfo } = useGetUserProfile();

  useEffect(() => {
    if (!userInfo?.id) {
      return;
    }

    sseRef.current = new ReconnectingEventSource(
      `${getApiPath(
        getTemplatePath(API_PATH.LISTEN_LEVEL_UP, { userId: userInfo.id })
      )}`
    );

    sseRef.current.addEventListener('message', (e) => {
      onSuccess(JSON.parse(e.data));
    });

    return () => {
      sseRef.current?.close();
    };
  }, [userInfo?.id]);
};
