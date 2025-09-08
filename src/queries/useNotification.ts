import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { useEffect, useRef } from 'react';
import ReconnectingEventSource from 'reconnecting-eventsource';
import _ from 'lodash';

import { useGetUserProfile } from './useUser';

import { API_PATH, getApiPath } from '@/apis';
import {
  getNotificationDetails,
  markReadNotification,
  getNotifications,
  getUnreadNotifications,
  markReadAllNotification,
} from '@/apis/notification';
import { FILTER_LIMIT } from '@/constants/filter';
import { Notification } from '@/typings/notification';
import { getTemplatePath } from '@/utils/string';

export const useGetNotifications = () => {
  const { data: user } = useGetUserProfile();
  return useInfiniteQuery(
    API_PATH.GET_NOTIFICATIONS,
    ({ pageParam = 1 }) => getNotifications(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        // Calculate the next page number based on your data structure
        if (_.size(lastPage) === FILTER_LIMIT) {
          return pages.length;
        }
        return undefined;
      },
      enabled: !!user?.id,
    }
  );
};

export const useGetNotificationtDetails = (id: string) => {
  return useQuery(
    [API_PATH.GET_NOTIFICATION_DETAILS, id],
    () => getNotificationDetails(id),
    { enabled: !!id, refetchOnWindowFocus: false }
  );
};

export const useMarkReadNotification = () => {
  const queryClient = useQueryClient();
  return useMutation(markReadNotification, {
    onSuccess: () => {
      queryClient.invalidateQueries([API_PATH.GET_NOTIFICATIONS]);
      queryClient.invalidateQueries([API_PATH.COUNTING_UNREAD_NOTIFICATIONS]);
    },
  });
};

export const useMarkReadAllNotification = () => {
  const queryClient = useQueryClient();
  return useMutation(markReadAllNotification, {
    onSuccess: () => {
      queryClient.invalidateQueries([API_PATH.GET_NOTIFICATIONS]);
      queryClient.invalidateQueries([API_PATH.COUNTING_UNREAD_NOTIFICATIONS]);
    },
  });
};

export const useGetUnreadNotifications = () => {
  return useQuery(
    [API_PATH.COUNTING_UNREAD_NOTIFICATIONS],
    getUnreadNotifications
  );
};

type UseListenNotification = {
  onSuccess: (data: Notification) => void;
};

export const useListenNotification = ({ onSuccess }: UseListenNotification) => {
  const queryClient = useQueryClient();
  const sseRefs = useRef<ReconnectingEventSource[]>([]);
  const { data: userInfo } = useGetUserProfile();

  useEffect(() => {
    if (!userInfo?.id) {
      return;
    }

    // Add the API paths for each event source
    const eventSources = [
      `${getApiPath(API_PATH.LISTEN_NOTIFICATION)}`,
      `${getApiPath(
        getTemplatePath(API_PATH.LISTEN_NOTIFICATION_BY_USER, {
          id: userInfo.id,
        })
      )}`,
    ];

    eventSources.forEach((apiPath) => {
      const sse = new ReconnectingEventSource(apiPath);
      sseRefs.current.push(sse);

      sse.addEventListener('message', (e) => {
        const data: Notification = JSON.parse(e.data);
        onSuccess(data);
        queryClient.invalidateQueries([API_PATH.COUNTING_UNREAD_NOTIFICATIONS]);
        queryClient.invalidateQueries([API_PATH.GET_NOTIFICATIONS]);
      });
    });

    return () => {
      sseRefs.current.forEach((sse) => {
        sse.close();
      });
    };
  }, [userInfo?.id]);
};
