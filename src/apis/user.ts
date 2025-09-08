import _ from 'lodash';

import { API_PATH } from '@/apis';
import request from '@/utils/request';
import { DeleteMyAccountForm, UpdatePasswordForm } from '@/typings/password';
import {
  DeleteMyAccountResponse,
  GetUserProfileResponse,
  UpdateAvatarResponse,
  UpdateCoverResponse,
  UpdatePasswordResponse,
  UpdateUserProfileResponse,
} from '@/typings/response';
import {
  CountMyTeamTabs,
  LinkAccount,
  UserProfileForm,
  UserReferral,
  UserFollowing,
  UserLevel,
  KycPersonalInfo,
  KycDocument,
  KycDetails,
} from '@/typings/user';
import { ListResponse, Pagination, PaginationWithName } from '@/typings/common';
import { CardItem, MySaleHistoryItem } from '@/typings/card';
import { getTemplatePath } from '@/utils/string';

export const getUserProfile = (): Promise<GetUserProfileResponse> => {
  return request.get(API_PATH.USER_PROFILE);
};

export const updateUserProfile = (
  body: UserProfileForm
): Promise<UpdateUserProfileResponse> => {
  return request.put(API_PATH.USER_PROFILE, body);
};

export const updatePassword = (
  body: UpdatePasswordForm
): Promise<UpdatePasswordResponse> => {
  return request.put(API_PATH.UPDATE_PASSWORD, body);
};

export const updateAvatar = (file: File): Promise<UpdateAvatarResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  return request.put(API_PATH.UPDATE_AVATAR, formData);
};

export const updateCover = (
  file: File,
  onUploadProgress: (value: number) => void
): Promise<UpdateCoverResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  return request.put(API_PATH.UPDATE_COVER, formData, {
    timeout: 120 * 1000,
    onUploadProgress: function (progressEvent) {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onUploadProgress(percentCompleted);
    },
  });
};

export const getReferrals = (
  params?: Pagination
): Promise<ListResponse<UserReferral>> => {
  return request.get(API_PATH.GET_REFERRALS, { params });
};

export const getUserProfileById = (
  id: string
): Promise<GetUserProfileResponse> => {
  return request.get(`${API_PATH.GET_PROFILE_BY_USER}/${id}/profile`);
};

export const getNftsByUser = (
  id: string,
  params?: Pagination
): Promise<ListResponse<CardItem>> => {
  const rarity = _.get(params, 'rarity', []);
  const requestParams = {
    ...params,
    rarity: _.includes(rarity, 'white') ? [...rarity, 'na'] : rarity,
  };

  return request.get(`${API_PATH.GET_NFT_BY_USER}/${id}/nfts`, {
    params: requestParams,
  });
};

export const subscribeEmail = (email: string) => {
  return request.post(API_PATH.SUBCRIBE_EMAIL, { email });
};

export const deleteMyAccount = (
  body: DeleteMyAccountForm
): Promise<DeleteMyAccountResponse> => {
  return request.post(API_PATH.DELETE_MY_ACCOUNT, body);
};

export const getCountMyTeamTabs = (): Promise<CountMyTeamTabs> => {
  return request.get(API_PATH.COUNT_TOTAL_MY_TEAM_TAB);
};

export const getMyNftSales = (
  params: Pagination
): Promise<ListResponse<MySaleHistoryItem>> => {
  return request.get(API_PATH.GET_MY_NFT_SALES, { params });
};

export const getRiders = (
  params?: PaginationWithName
): Promise<ListResponse<Partial<CardItem>>> => {
  return request.get(API_PATH.RIDERS_SEARCH, { params });
};

export const getUsers = (
  params?: PaginationWithName
): Promise<ListResponse<Partial<CardItem>>> => {
  return request.get(API_PATH.USERS_SEARCH, { params });
};

export const linkAccount = (data: LinkAccount) => {
  return request.post(API_PATH.LINK_ACCOUNT, data);
};

export const followUser = (id: string): Promise<boolean> => {
  return request.post(`${API_PATH.FOLLOW_USER}/${id}/follow`);
};

export const doesUserFollow = (userId: string): Promise<boolean> => {
  const URL = getTemplatePath(API_PATH.GET_USER_FOLLOWS, { userId });
  return request.get(URL);
};

export const unfollowUser = (id: string): Promise<boolean> => {
  return request.post(`${API_PATH.FOLLOW_USER}/${id}/unfollow`);
};

export const getFollowings = (): Promise<UserFollowing[]> => {
  return request.get(`${API_PATH.GET_FOLLOWINGS}`);
};

export const getUserLevels = (): Promise<UserLevel[]> => {
  return request.get(API_PATH.GET_USER_LEVELS);
};

export const getKycDetails = (): Promise<KycDetails> => {
  return request.get(API_PATH.GET_KYC_DETAILS);
};

export const kycPersonalInfo = (data: KycPersonalInfo) => {
  return request.patch(API_PATH.KYC_PERSONAL_INFO, data);
};

export const kycDocument = ({ file }: KycDocument) => {
  const formData = new FormData();
  formData.append('file', file);
  return request.patch(API_PATH.KYC_DOCUMENT, formData);
};

export const kycAutoVerify = () => {
  return request.post(API_PATH.KYC_AUTO_VERIFY);
};
