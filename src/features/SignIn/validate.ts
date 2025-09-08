import { TFunction } from 'next-i18next';
import * as yup from 'yup';

const signInSchema = (t: TFunction) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(t('message:invalid'))
      .required(t('message:required')),
    password: yup
      .string()
      .required(t('message:required'))
      .min(6, t('message:min_characters', { characters: 6 }))
      .max(50, t('message:max_characters', { characters: 50 })),
  });
};

export default signInSchema;
