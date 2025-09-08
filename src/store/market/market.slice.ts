import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MarketState = {
  nftBuyings: string[];
};

const initialState: MarketState = {
  nftBuyings: [],
};

export const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    addNftBuying(state, action: PayloadAction<string>) {
      state.nftBuyings = [...state.nftBuyings, action.payload];
    },
    removeNftBuying(state, action: PayloadAction<string>) {
      state.nftBuyings = state.nftBuyings.filter(
        (nftId) => nftId !== action.payload
      );
    },
  },
});

export const { addNftBuying, removeNftBuying } = marketSlice.actions;
export default marketSlice.reducer;
