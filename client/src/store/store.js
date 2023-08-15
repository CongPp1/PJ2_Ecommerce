import { configureStore } from '@reduxjs/toolkit';
import apSlice from './appReducer';

export const store = configureStore({
  reducer: {
    appReducer: apSlice,
  },
});
console.log(store.appReducer)
