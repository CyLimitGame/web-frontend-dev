import Cookies from 'js-cookie';

import { CookieName } from '@/constants/cookieName';

const TOKEN = 'TOKEN';

export const setTokenCookie = (value: string) => {
  if (typeof window === 'undefined') {
    return;
  }
  return window.localStorage.setItem(TOKEN, value);
  // return Cookies.set(TOKEN, value, { path: '' });
};

export const getTokenCookie = () => {
  if (typeof window === 'undefined') {
    return;
  }
  return window.localStorage.getItem(TOKEN);
  // return Cookies.get(TOKEN);
};

export const removeTokenCookie = () => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.removeItem(TOKEN);
  // return Cookies.remove(TOKEN, { path: '' });
};

export const getInviteCodeCookie = () => {
  return Cookies.get(CookieName.INVITE_CODE);
};
