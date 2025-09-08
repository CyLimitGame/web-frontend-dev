import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUserInfoAsync, getWalletAsync } from './user.thunk';

type User = {
  name?: string;
  email?: string;
};

type Wallet = {
  address?: string;
  amount?: string;
  symbol?: string;
};

type UserState = {
  user?: User;
  wallet?: Wallet;
  status: 'idle' | 'loading' | 'failed';
};

const initialState: UserState = {
  user: {
    name: '',
    email: '',
  },
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getUserInfoAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = 'idle';
          state.user = action.payload;
        }
      )
      .addCase(getWalletAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getWalletAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = 'idle';
          state.wallet = action.payload;
        }
      );
  },
});

export default userSlice.reducer;
