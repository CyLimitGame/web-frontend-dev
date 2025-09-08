import { TFunction } from 'next-i18next';
import Web3 from 'web3';
import * as yup from 'yup';

const withdrawSchema = (t: TFunction) => {
  return yup.object().shape({
    amount: yup
      .number()
      .required(t('message:required'))
      .typeError(t('message:must_be_a_number')),
    toAddress: yup
      .string()
      .required(t('message:required'))
      .test('toAddress', t('message:invalid'), (val) =>
        Web3.utils.isAddress(val || '')
      ),
    password: yup
      .string()
      .required(t('message:required'))
      .min(6, t('message:min_characters', { characters: 6 }))
      .max(50, t('message:max_characters', { characters: 50 })),
  });
};

export default withdrawSchema;
