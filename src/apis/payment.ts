import request from '@/utils/request';

type PaymentIntents = {
  [key in string]: string;
};

export const getPaymentIntents = (
  path: string,
  body: PaymentIntents
): Promise<{ clientSecret: string }> => {
  return request.post(path, body);
};
