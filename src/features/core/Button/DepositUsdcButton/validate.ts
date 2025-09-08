import { TFunction } from 'next-i18next';
import * as yup from 'yup';

const depositSchema = (t: TFunction) => {
  return yup.object().shape({
    amount: yup
      .number()
      .required(t('message:required'))
      .typeError(t('message:must_be_a_number')),
  });
};

export default depositSchema;
