import { API_PATH } from '.';

import {
  VerifyWithdraw,
  Withdraw,
  WithdrawProcessingResponse,
  WithdrawRequest,
  WithdrawResonpse,
} from '@/typings/withdraw';
import request from '@/utils/request';

export const withdraw = (body: Withdraw): Promise<WithdrawResonpse> => {
  return request.post(API_PATH.WITHDRAW, body);
};

export const verifyWithdraw = ({ id, emailOtpCode }: VerifyWithdraw) => {
  return request.post(`${API_PATH.VERIFY_WITHDRAW}/${id}/verify`, {
    emailOtpCode,
  });
};

export const getWithdrawHistory = (
  params: WithdrawRequest
): Promise<WithdrawProcessingResponse> => {
  return request.get(API_PATH.WITHDRAW_HISTORY, { params });
};
