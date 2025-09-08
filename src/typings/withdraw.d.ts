import { WithdrawStatus } from './withdraw.enum';

export type Withdraw = {
  amount: number;
  toAddress: string;
  password: string;
};

export type VerifyWithdraw = {
  id: string;
  emailOtpCode: string;
};

export type WithdrawRequest = {
  page: number;
  limit: number;
};

export type WithdrawResonpse = {
  id: string;
};

export type WithdrawProcessing = {
  amount: number;
  id: string;
  toWallet: string;
  userId: string;
  createdAt: string;
  status: WithdrawStatus;
};

export type WithdrawProcessingResponse = {
  items: WithdrawProcessing[];
  total: number;
};
