import { TFunction } from 'next-i18next';
import { isValidPhoneNumber } from 'react-phone-number-input';
import * as yup from 'yup';

const editProfileSchema = (t: TFunction) => {
  return yup.object().shape({
    phoneNumber: yup
      .string()
      .required(t('message:required'))
      .test('phoneNumber', t('message:invalid'), (value) => {
        return isValidPhoneNumber(value || '');
      }),
    firstName: yup
      .string()
      .required(t('message:required'))
      .max(20, t('message:max_characters', { characters: 20 })),
    lastName: yup
      .string()
      .required(t('message:required'))
      .max(20, t('message:max_characters', { characters: 20 })),
    dateOfBirth: yup.string().nullable().required(t('message:required')),
    nickName: yup
      .string()
      .required(t('message:required'))
      .max(30, t('message:max_characters', { characters: 30 })),
  });
};

export default editProfileSchema;
