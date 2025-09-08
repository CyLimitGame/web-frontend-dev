import { TFunction } from 'next-i18next';
import * as yup from 'yup';

import { AuctionCard } from '@/typings/auction';
import { getCurrentPrice } from '@/utils/card';
import { CurrencyExchange } from '@/typings/exchange';
import { getEuroPrice, getUsdPrice } from '@/utils/number';

const bidSchema = (
  t: TFunction,
  card: AuctionCard,
  exchange?: CurrencyExchange
) => {
  let price = 0;
  if (exchange) {
    const usdPrice = getCurrentPrice(card);
    const euroPrice = getEuroPrice(usdPrice, exchange);
    price =
      euroPrice < 0.5 ? getUsdPrice(0.5, exchange) : getCurrentPrice(card);
  }

  if (!exchange) {
    const minPrice = getCurrentPrice(card);
    price = Number(minPrice) < 0.5 ? 0.5 : Number(minPrice);
  }

  return yup.object().shape({
    amount: yup
      .number()
      .required(t('message:required'))
      .typeError(t('message:must_be_a_number'))
      .min(Number(price), t('message:min_value', { value: price })),
  });
};

export default bidSchema;
