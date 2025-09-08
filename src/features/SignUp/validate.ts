import { TFunction } from 'next-i18next';
import * as yup from 'yup';
import { AnyObject } from 'yup/lib/types';

const signUpSchema = (t: TFunction) => {
  return yup.object().shape({
    nickName: yup.string().required(t('message:required')),
    email: yup
      .string()
      .required(t('message:required'))
      .email(t('message:invalid')),
    password: yup
      .string()
      .required(t('message:required'))
      .min(6, t('message:min_characters', { characters: 6 }))
      .max(50, t('message:max_characters', { characters: 50 })),
    passwordToConfirm: yup
      .string()
      .when('password', (password: string, field: AnyObject) =>
        password
          ? field
              .required(t('message:required'))
              .min(6, t('message:min_characters', { characters: 6 }))
              .max(50, t('message:max_characters', { characters: 50 }))
              .oneOf([yup.ref('password')], t('message:confirm_password'))
          : field
      ),
    refInvitationCode: yup
      .string()
      .test(
        'refInvitationCode',
        t('message:must_be_exactly_characters', { characters: 10 }),
        (val) => (!val ? true : val.length === 10)
      ),
  });
};

export default signUpSchema;
