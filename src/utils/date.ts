import dayjs, { Dayjs } from 'dayjs';

export const DATE_FORMAT = 'DD/MM/YYYY';

export const DATE_TIME_FORMAT = 'DD/MM/YYYY, HH:mm';

export const formatStringToDate = (value: string) => {
  return value ? dayjs(value).toDate() : null;
};

export const formatDate = (value: string) => {
  return value ? dayjs(value).format(DATE_FORMAT) : null;
};

export const formatDateTime = (value: string) => {
  return value ? dayjs(value).format(DATE_TIME_FORMAT) : null;
};

export const checkExpiredTime = (value: string | Dayjs) => {
  const now = dayjs();
  return value ? dayjs(value).isBefore(now) : true;
};

export const toISOString = (value: string | Date) => {
  return value ? dayjs(value).toISOString() : null;
};
