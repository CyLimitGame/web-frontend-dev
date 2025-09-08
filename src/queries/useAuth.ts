import { useTranslation } from 'next-i18next';
import { useMutation } from 'react-query';

import {
  forgotPassword,
  getUserProfile,
  resetPassword,
  signIn,
  signInWithFacebook,
  signInWithGoogle,
  signUp,
} from '@/apis';
import { useToastMessage } from '@/hooks/useToastMessage';
import { navigateTo, navigateToSignin } from '@/utils/navigation';
import { setTokenCookie } from '@/utils/cookies';
import { ErrorResponse, SignInResponse } from '@/typings/response';
import { SignInForm } from '@/typings/user';
import { SigninWithSocial } from '@/typings/request';
import { saveTutorial } from '@/features/core/Button/TutorialButton';
import { PATH } from '@/constants/path';
import { FreeCardsTeamStatusEnum } from '@/typings/user.enum';

export const useForgotPassword = () => {
  const toast = useToastMessage();
  const { t } = useTranslation();

  return useMutation(forgotPassword, {
    onSuccess: () => {
      toast({
        title: t('success'),
        description: t('message:please_check_email'),
        status: 'success',
      });
    },
  });
};

export const useResetPassword = () => {
  const toast = useToastMessage();
  const { t } = useTranslation();

  return useMutation(resetPassword, {
    onSuccess: () => {
      toast({
        title: t('success'),
        description: t('message:reset_password_success'),
        status: 'success',
      });
      navigateToSignin();
    },
  });
};

export const useSignIn = () => {
  return useMutation<SignInResponse, ErrorResponse, SignInForm>(
    (params) => signIn(params),
    {
      onSuccess: ({ accessToken }) => {
        handleNavigationLoginSuccess(accessToken);
      },
    }
  );
};

export const useSignInWithGoogle = () => {
  return useMutation<SignInResponse, ErrorResponse, SigninWithSocial>(
    signInWithGoogle,
    {
      onSuccess: ({ accessToken }) => {
        handleNavigationLoginSuccess(accessToken);
      },
    }
  );
};

export const useSignInWithFacebook = () => {
  return useMutation<SignInResponse, ErrorResponse, SigninWithSocial>(
    signInWithFacebook,
    {
      onSuccess: ({ accessToken }) => {
        handleNavigationLoginSuccess(accessToken);
      },
    }
  );
};

export const useSignUp = () => {
  const toast = useToastMessage();
  const { t } = useTranslation();

  return useMutation(signUp, {
    onSuccess: () => {
      toast({
        title: t('success'),
        description: t('message:register_success'),
        status: 'success',
      });
    },
  });
};

const handleNavigationLoginSuccess = async (accessToken: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(accessToken);
      setTokenCookie(accessToken);
    }, 100);
  }).then(async () => {
    const {
      jersey,
      sponsor,
      primaryColor,
      secondaryColor,
      freeCardsTeamStatus,
    } = await getUserProfile();

    saveTutorial({ isFirstLogin: true });

    const isInfoReady = jersey && sponsor && primaryColor && secondaryColor;

    if (isInfoReady && freeCardsTeamStatus === FreeCardsTeamStatusEnum.NONE) {
      return navigateTo(PATH.OPEN_THE_PACK);
    }

    if (!isInfoReady) {
      return navigateTo(PATH.SET_DEFAULT_TEAM);
    }

    return navigateTo(PATH.HOME);
  });
};
