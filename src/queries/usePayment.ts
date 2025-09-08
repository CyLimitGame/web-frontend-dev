import { useEffect, useRef, useState } from 'react';
import { QueryKey, useQueryClient } from 'react-query';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';
import ReconnectingEventSource from 'reconnecting-eventsource';
import _ from 'lodash';

import { useGetUserProfile } from './useUser';

import { API_PATH, getApiPath, getPaymentIntents } from '@/apis';
import { removeNftBuying } from '@/store/market/market.slice';
import { MarketType } from '@/typings/card.enum';
import { useToastMessage } from '@/hooks/useToastMessage';

type UsePaymentProps = {
  id: string;
  key: string;
  path: string;
  queryKey?: QueryKey;
  onSuccess?: () => void;
};

export const usePayment = ({
  key,
  id,
  queryKey,
  onSuccess,
  path,
}: UsePaymentProps) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>('');
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  const queryClient = useQueryClient();

  const handleChange = async (event: any) => {
    setDisabled(event.empty || !event.complete);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmitForm = async (values: any) => {
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const data = await getPaymentIntents(path, {
        amount: values.amount,
        [key]: id,
      });

      const payload = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          card: elements.getElement(CardElement),
        },
      });

      if (payload.error) {
        setError(`${payload.error.message}`);
      } else {
        setError(null);
        setSucceeded(true);
        onSuccess && onSuccess();
        queryKey && queryClient.invalidateQueries(queryKey);
      }
    } finally {
      setProcessing(false);
    }
  };

  return {
    handleChange,
    handleSubmitForm,
    succeeded,
    error,
    processing,
    disabled,
  };
};

type UseListentPaymentProps = {
  onSuccess?: (data: UseListenPaymentResponse) => void;
};

enum Topic {
  LOCKED = 'nfts:locked',
  CREATED = 'orders:created',
}

export enum PaymentMethod {
  BLOCKCHAIN = 'blockchain',
  STRIPE = 'stripe',
  RAMP = 'ramp',
}

export type UseListenPaymentResponse = {
  isLocked: boolean;
  success: boolean;
  nftId: string;
  bundleId: string;
  marketType: MarketType;
  userId: string;
  topic: Topic;
  paymentMethod: PaymentMethod;
};

export const useListenPayment = ({ onSuccess }: UseListentPaymentProps) => {
  const sseRef = useRef<ReconnectingEventSource | null>(null);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data: userInfo } = useGetUserProfile();

  const toast = useToastMessage();
  const { t } = useTranslation();

  useEffect(() => {
    if (!userInfo?.id) {
      return;
    }

    sseRef.current = new ReconnectingEventSource(
      `${getApiPath(API_PATH.LISTEN_PAYMENT)}`
    );

    sseRef.current.addEventListener('message', (e) => {
      const data: UseListenPaymentResponse = JSON.parse(e.data);
      const marketType = _.get(data, 'marketType');

      dispatch(removeNftBuying(data.bundleId || data.nftId));

      if (data.success) {
        onSuccess && onSuccess(data);

        if (data.userId === userInfo?.id && !data.isLocked) {
          toast({
            title: t('success'),
            description: t('message:payment_success'),
            status: 'success',
          });
          if (marketType === MarketType.AUCTION) {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        }
        queryClient.invalidateQueries([API_PATH.GET_CARD]);
        queryClient.invalidateQueries([API_PATH.GET_CARD, data.nftId]);
        queryClient.invalidateQueries([
          API_PATH.GET_BUNDLES_DETAIL,
          data.bundleId,
        ]);
      } else {
        if (data.userId === userInfo?.id) {
          toast({
            title: t('failure'),
            description: t('message:payment_failure'),
            status: 'error',
          });
        }
        queryClient.invalidateQueries([API_PATH.GET_CARD]);
      }
    });
    return () => {
      sseRef.current?.close();
    };
  }, [userInfo?.id]);
};
