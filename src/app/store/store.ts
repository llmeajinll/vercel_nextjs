import { configureStore } from '@reduxjs/toolkit';
import Reducer from './slice';

export const store = configureStore({
  reducer: {
    counter: Reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
