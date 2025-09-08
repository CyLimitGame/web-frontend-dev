export type ForgotPasswordForm = {
  email: string;
};

export type ResetPasswordForm = {
  userId: string;
  password: string;
  passwordConfirm: string;
  code: string;
};

export type UpdatePasswordForm = {
  oldPassword: string;
  newPassword: string;
  newPasswordToConfirm: string;
};

export type DeleteMyAccountForm = {
  password: string;
};
