import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import userReducer from '@/store/user/user.slice';
import marketReducer from '@/store/market/market.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    market: marketReducer,
  },
  middleware: [thunk],
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
