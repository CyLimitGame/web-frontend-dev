import { API_PATH } from './api-path';

import { ResetPasswordForm } from '@/typings/password';
import { SignInResponse } from '@/typings/response';
import { SignInForm, SignUpForm } from '@/typings/user';
import request from '@/utils/request';
import { sanitizeSignUp } from '@/utils/sanitize';
import { SigninWithSocial } from '@/typings/request';

export const forgotPassword = (email: string) => {
  return request.post(API_PATH.FORGOT_PASSWORD, { email });
};

export const resetPassword = (values: ResetPasswordForm) => {
  return request.post(API_PATH.RESET_PASSWORD, values);
};

export const signIn = (body: SignInForm): Promise<SignInResponse> => {
  return request.post(API_PATH.SIGN_IN, body);
};

export const signUp = (body: SignUpForm) => {
  return request.post(API_PATH.SIGN_UP, sanitizeSignUp(body));
};

export const signInWithGoogle = (
  data: SigninWithSocial
): Promise<SignInResponse> => {
  return request.post(API_PATH.SIGN_IN_WITH_GOOGLE, data);
};

export const signInWithFacebook = (
  data: SigninWithSocial
): Promise<SignInResponse> => {
  return request.post(API_PATH.SIGN_IN_WITH_FACEBOOK, data);
};

export const checkExpiredToken = () => {
  return request.post(API_PATH.CHECK_EXPIRED_TOKEN);
};
