import { TFunction } from 'next-i18next';
import * as yup from 'yup';

import { BundleCard } from '@/typings/bundle';
import { getCurrentPrice } from '@/utils/card';

const bidSchema = (t: TFunction, card: BundleCard) => {
  const minPrice = getCurrentPrice(card);
  const price = Number(minPrice) < 0.5 ? 0.5 : Number(minPrice);

  return yup.object().shape({
    amount: yup
      .number()
      .required(t('message:required'))
      .typeError(t('message:must_be_a_number'))
      .min(Number(price), t('message:min_value', { value: price })),
  });
};

export default bidSchema;
