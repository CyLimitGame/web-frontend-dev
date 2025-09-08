import { TFunction } from 'next-i18next';
import * as yup from 'yup';

const deleteMyAccountSchema = (t: TFunction, isPasswordEmpty?: boolean) => {
  return yup.object().shape({
    password: !isPasswordEmpty
      ? yup
          .string()
          .required(t('message:required'))
          .min(6, t('message:min_characters', { characters: 6 }))
      : yup.string(),
  });
};

export default deleteMyAccountSchema;
