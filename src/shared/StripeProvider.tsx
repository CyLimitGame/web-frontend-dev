import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY } from '@/config/appConfig';

const promise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

type Props = {
  children: React.ReactElement;
};

const StripeProvider = ({ children }: Props) => {
  return <Elements stripe={promise}>{children}</Elements>;
};

export default StripeProvider;
