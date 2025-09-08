import { TFunction } from 'next-i18next';
import * as yup from 'yup';

const sellSchema = (t: TFunction) => {
  return yup.object().shape({
    fixedPrice: yup
      .number()
      .min(0.5, t('message:min_value', { value: 0.5 }))
      .required(t('message:required'))
      .typeError(t('message:must_be_a_number')),
  });
};

export default sellSchema;
