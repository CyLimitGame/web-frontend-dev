import { useMutation, useQueryClient, useQuery } from 'react-query';

import { getWithdrawHistory, verifyWithdraw, withdraw } from '@/apis/withdraw';
import { API_PATH } from '@/apis';
import { WithdrawRequest } from '@/typings/withdraw';

export const useWithdraw = () => {
  return useMutation(withdraw);
};

export const useVerifyWithdraw = () => {
  const queryClient = useQueryClient();
  return useMutation(verifyWithdraw, {
    onSuccess: () => {
      queryClient.invalidateQueries(API_PATH.USER_PROFILE);
      queryClient.invalidateQueries(API_PATH.WITHDRAW_HISTORY);
    },
  });
};

export const useGetWithdrawHistory = (params: WithdrawRequest) => {
  return useQuery([API_PATH.WITHDRAW_HISTORY, { ...params }], () =>
    getWithdrawHistory(params)
  );
};
