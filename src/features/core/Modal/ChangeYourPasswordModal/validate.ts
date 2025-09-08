import { TFunction } from 'next-i18next';
import * as yup from 'yup';
import { AnyObject } from 'yup/lib/types';

const changeYourPasswordSchema = (t: TFunction, isPasswordEmpty?: boolean) => {
  return yup.object().shape({
    oldPassword: !isPasswordEmpty
      ? yup
          .string()
          .required(t('message:required'))
          .min(6, t('message:min_characters', { characters: 6 }))
      : yup.string(),
    newPassword: yup
      .string()
      .required(t('message:required'))
      .min(6, t('message:min_characters', { characters: 6 }))
      .max(50, t('message:max_characters', { characters: 50 })),
    newPasswordToConfirm: yup
      .string()
      .when('newPassword', (newPassword: string, field: AnyObject) =>
        newPassword
          ? field
              .required(t('message:required'))
              .min(6, t('message:min_characters', { characters: 6 }))
              .max(50, t('message:max_characters', { characters: 50 }))
              .oneOf([yup.ref('newPassword')], t('message:confirm_password'))
          : field
      ),
  });
};

export default changeYourPasswordSchema;
