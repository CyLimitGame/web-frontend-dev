import router from 'next/router';
import qs from 'qs';
import { FieldValues } from 'react-hook-form';

import { getTemplatePath } from './string';

import { PATH } from '@/constants/path';
import { FilterCardRequest } from '@/typings/request';

export const navigateTo = (
  path: string,
  params?: FieldValues,
  options?: any
) => {
  const query = qs.stringify(params, { arrayFormat: 'repeat' });
  const pathName = query ? `${path}?${query}` : path;
  return router.push(pathName, undefined, { scroll: true, ...options });
};

export const navigateToHome = () => navigateTo(PATH.HOME);

export const navigateToSignup = () => navigateTo(PATH.SIGNUP);

export const navigateToSignin = () => navigateTo(PATH.SIGNIN);

export const navigateToForgotPassword = () => navigateTo(PATH.FORGOT_PASSWORD);

export const navigateToAllCards = (params?: FilterCardRequest) => {
  const query = qs.stringify(params, { arrayFormat: 'repeat' });
  return navigateTo(`${PATH.MARKET}?${query}`);
};

export const navigateToMyProfile = () => navigateTo(PATH.MY_PROFILE);

export const navigateToEditMyProfile = () => navigateTo(PATH.EDIT_PROFILE);

export const navigateToViewMyProfile = () => navigateTo(PATH.VIEW_PROFILE);

export const navigateToMyTeam = (params?: FilterCardRequest) => {
  const query = qs.stringify(params, { arrayFormat: 'repeat' });
  return navigateTo(`${PATH.MY_TEAM}?${query}`);
};

export const navigateToGoBack = () => router.back();

export const navigateToRules = () => navigateTo(PATH.RULES);

export const navigateToRewards = () => navigateTo(PATH.REWARDS);

export const navigateToTakeReward = (gameId: string) => {
  const URL = getTemplatePath(PATH.TAKE_REWARD, { gameId });
  navigateTo(URL);
};

export const navigateToWatch = () => navigateTo(PATH.WATCH);

export const navigateToTeamScore = () => navigateTo(PATH.TEAM_SCORE);

export const navigateToBundleDetail = (id: string) =>
  navigateTo(`${PATH.BUNDLES}/${id}`);

export const navigateToCard = (id: string) => navigateTo(`${PATH.CARDS}/${id}`);

export const navigateToUserDetail = (id: string) =>
  navigateTo(`${PATH.USER}/${id}`);

export const navigateToRider = (riderId: string) =>
  navigateTo(getTemplatePath(PATH.RIDER_SCORE, { riderId }));
