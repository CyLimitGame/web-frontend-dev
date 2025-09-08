import { API_PATH } from './api-path';

import request from '@/utils/request';
import { getTemplatePath } from '@/utils/string';
import { ListResponse } from '@/typings/common';
import { FILTER_LIMIT } from '@/constants/filter';
import { Notification } from '@/typings/notification';

export const getNotifications = async (
  page: number
): Promise<Notification[]> => {
  const res: ListResponse<any> = await request.get(API_PATH.GET_NOTIFICATIONS, {
    params: { page, limit: FILTER_LIMIT },
  });
  return res.items;
};

export const getNotificationDetails = (id: string) => {
  const URL = getTemplatePath(API_PATH.GET_NOTIFICATION_DETAILS, { id });
  return request.get(URL);
};

export const markReadNotification = (id: string) => {
  const URL = getTemplatePath(API_PATH.MARK_READ_NOTIFICATIION, { id });
  return request.post(URL);
};

export const markReadAllNotification = () => {
  return request.post(API_PATH.MARK_READ_ALL_NOTIFICATIION);
};

export const getUnreadNotifications = () => {
  return request.get(API_PATH.COUNTING_UNREAD_NOTIFICATIONS);
};
