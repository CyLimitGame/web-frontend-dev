import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useTranslation } from 'next-i18next';
import { AxiosError } from 'axios';
import _ from 'lodash';

import { useRouter } from 'next/router';

import {
  API_PATH,
  checkExpiredToken,
  deleteMyAccount,
  doesUserFollow,
  followUser,
  getCountMyTeamTabs,
  getMyNftSales,
  getReferrals,
  getUserProfile,
  getUserProfileById,
  unfollowUser,
  linkAccount,
  subscribeEmail,
  updateAvatar,
  updateCover,
  updatePassword,
  updateUserProfile,
  getFollowings,
  getAvgCapScoreAndBonus,
  getUserLevels,
  kycPersonalInfo,
  getKycDetails,
  kycDocument,
  kycAutoVerify,
} from '@/apis';
import { useToastMessage } from '@/hooks/useToastMessage';
import {
  DeleteMyAccountResponse,
  ErrorResponse,
  UpdateAvatarResponse,
  UpdateCoverResponse,
  UpdatePasswordResponse,
  UpdateUserProfileResponse,
} from '@/typings/response';
import { DeleteMyAccountForm, UpdatePasswordForm } from '@/typings/password';
import { UserProfileForm } from '@/typings/user';
import { navigateTo, navigateToSignin } from '@/utils/navigation';
import { removeTokenCookie } from '@/utils/cookies';
import { Pagination } from '@/typings/common';
import { PATH } from '@/constants/path';
import { FreeCardsTeamStatusEnum } from '@/typings/user.enum';

export const useGetUserProfile = () => {
  const router = useRouter();

  return useQuery(API_PATH.USER_PROFILE, getUserProfile, {
    onSuccess({ jersey, sponsor, primaryColor, secondaryColor }) {
      if (!jersey && !sponsor && !primaryColor && !secondaryColor) {
        if (router.pathname !== PATH.SET_DEFAULT_TEAM) {
          navigateTo(PATH.SET_DEFAULT_TEAM);
        }
      }
    },
  });
};

export const useUpdateUserProfile = ({
  isShowToast = true,
}: {
  isShowToast?: boolean;
}) => {
  const toast = useToastMessage();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation<UpdateUserProfileResponse, ErrorResponse, UserProfileForm>(
    (body) => updateUserProfile(body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(API_PATH.USER_PROFILE);
        isShowToast &&
          toast({
            title: t('success'),
            description: t('message:we_saved_your_profile_changes'),
            status: 'success',
          });
      },
    }
  );
};

export const useSkipNoticeFreeCards = () => {
  const queryClient = useQueryClient();
  return useMutation<UpdateUserProfileResponse, ErrorResponse, UserProfileForm>(
    () =>
      updateUserProfile({ freeCardsTeamStatus: FreeCardsTeamStatusEnum.SKIP }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(API_PATH.USER_PROFILE);
      },
    }
  );
};

export const useUpdatePassword = () => {
  const toast = useToastMessage();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation<UpdatePasswordResponse, ErrorResponse, UpdatePasswordForm>(
    (body) => updatePassword(body),
    {
      onSuccess: () => {
        toast({
          title: t('success'),
          description: t('message:we_saved_your_profile_changes'),
          status: 'success',
        });
        queryClient.invalidateQueries(API_PATH.USER_PROFILE);
      },
    }
  );
};

export const useCheckExpiredToken = () => {
  return useMutation(checkExpiredToken, {
    onError: () => {
      removeTokenCookie();
      navigateToSignin();
    },
  });
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const toast = useToastMessage();

  return useMutation<UpdateAvatarResponse, AxiosError, File>(
    (file) => updateAvatar(file),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(API_PATH.USER_PROFILE);
        toast({
          title: t('success'),
          description: t('message:we_saved_your_profile_changes'),
          status: 'success',
        });
      },
    }
  );
};

export const useUpdateCover = (onUploadProgress: (value: number) => void) => {
  const queryClient = useQueryClient();
  const toast = useToastMessage();
  const { t } = useTranslation();

  return useMutation<UpdateCoverResponse, AxiosError, File>(
    (file) => updateCover(file, onUploadProgress),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(API_PATH.USER_PROFILE);
        toast({
          title: t('success'),
          description: t('message:we_saved_your_profile_changes'),
          status: 'success',
        });
      },
    }
  );
};

export const useGetReferrals = (params?: Pagination) => {
  return useQuery([API_PATH.GET_REFERRALS, { ...params }], () =>
    getReferrals(params)
  );
};

export const useGetProfileById = (id: string) => {
  return useQuery(
    [API_PATH.GET_PROFILE_BY_USER, id],
    () => getUserProfileById(id),
    { enabled: !!id }
  );
};

export const useFollowUser = () => {
  const toast = useToastMessage();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(followUser, {
    onSuccess: () => {
      toast({
        title: t('success'),
        description: t('message:you_have_successfully_followed_the_user'),
        status: 'success',
      });
      queryClient.invalidateQueries(API_PATH.GET_USER_FOLLOWS);
    },
  });
};

export const useDoesUserFollow = (userId: string) => {
  return useQuery(
    [API_PATH.GET_USER_FOLLOWS, userId],
    () => doesUserFollow(userId),
    {
      enabled: !!userId,
    }
  );
};

export const useGetFollowings = () => {
  return useQuery([API_PATH.GET_FOLLOWINGS], getFollowings);
};

export const useUnfollowUser = () => {
  const toast = useToastMessage();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(unfollowUser, {
    onSuccess: () => {
      toast({
        title: t('success'),
        description: t('message:you_have_successfully_unfollowed_the_user'),
        status: 'success',
      });
      queryClient.invalidateQueries(API_PATH.GET_USER_FOLLOWS);
      queryClient.invalidateQueries(API_PATH.GET_FOLLOWINGS);
    },
  });
};

export const useSubscribeEmail = () => {
  const { t } = useTranslation();
  const toast = useToastMessage();

  return useMutation(subscribeEmail, {
    onSuccess: () => {
      toast({
        title: t('success'),
        description: t('message:subscribe_email_success'),
        status: 'success',
      });
    },
  });
};

export const useDeleteMyAccount = () => {
  return useMutation<
    DeleteMyAccountResponse,
    ErrorResponse,
    DeleteMyAccountForm
  >((body) => deleteMyAccount(body), {
    onSuccess: () => {
      removeTokenCookie();
      navigateToSignin();
    },
  });
};

export const useGetCountMyTeamTabs = () => {
  return useQuery(API_PATH.COUNT_TOTAL_MY_TEAM_TAB, getCountMyTeamTabs);
};

export const useGetMyNftSales = (params: Pagination) => {
  return useQuery([API_PATH.GET_MY_NFT_SALES, { ...params }], async () => {
    const res = await getMyNftSales(params);
    const items = await getAvgCapScoreAndBonus({
      items: _.map(res.items, (item) => ({
        ...item,
        id: _.get(item, 'nftId'),
        riderId: _.get(item, 'nft.riderId'),
      })),
    });
    return {
      ...res,
      items,
    };
  });
};

export const useLinkAccount = () => {
  const queryClient = useQueryClient();
  return useMutation(linkAccount, {
    onSuccess: () => {
      navigateTo(PATH.AWARDS);
      queryClient.invalidateQueries(API_PATH.USER_PROFILE);
    },
    onError: () => {
      navigateTo(PATH.AWARDS);
      queryClient.invalidateQueries(API_PATH.USER_PROFILE);
    },
  });
};

export const useGetUserLevels = () => {
  return useQuery([API_PATH.GET_USER_LEVELS], getUserLevels);
};

export const useGetKycDetails = () => {
  return useQuery([API_PATH.GET_KYC_DETAILS], getKycDetails);
};

export const useKycPersonalInfo = () => {
  return useMutation(kycPersonalInfo);
};

export const useKycDocument = () => {
  return useMutation(kycDocument);
};

export const useKycAutoVerify = () => {
  return useMutation(kycAutoVerify);
};

export const useSkipFirstTeamCreation = () => {
  return useMutation(() => updateUserProfile({ isFirstTeamCreation: true }));
};
