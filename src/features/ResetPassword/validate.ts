import * as yup from 'yup';
import { TFunction } from 'next-i18next';
import { AnyObject } from 'yup/lib/types';

const resetPasswordSchema = (t: TFunction) => {
  return yup.object().shape({
    password: yup
      .string()
      .required(t('message:required'))
      .min(6, t('message:min_characters', { characters: 6 })),
    passwordConfirm: yup
      .string()
      .when('password', (password: string, field: AnyObject) =>
        password
          ? field
              .required(t('message:required'))
              .min(6, t('message:min_characters', { characters: 6 }))
              .oneOf([yup.ref('password')], t('message:confirm_password'))
          : field
      ),
  });
};

export default resetPasswordSchema;
