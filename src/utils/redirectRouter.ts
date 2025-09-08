import Router from 'next/router';

import { PATH } from '@/constants/path';

export const checkRedirectRouter = () => {
  const pathname = Router.pathname;

  const isRedirectToMarket = [
    `${PATH.CARDS}/[id]`,
    `${PATH.BUNDLES}/[id]`,
  ].includes(pathname);

  if (isRedirectToMarket) {
    Router.push(PATH.MARKET);
    return true;
  }

  return false;
};
