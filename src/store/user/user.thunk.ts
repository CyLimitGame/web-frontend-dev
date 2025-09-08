import { createAsyncThunk } from '@reduxjs/toolkit';

import { getUserProfile } from '@/apis';

export const getUserInfoAsync = createAsyncThunk(
  'user/fetchUserInfo',
  async () => {
    const data = await getUserProfile();
    return data;
  }
);

export const getWalletAsync = createAsyncThunk('user/fetchWallet', async () => {
  return {};
});
