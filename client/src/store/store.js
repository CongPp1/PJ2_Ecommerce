import { configureStore } from '@reduxjs/toolkit';
import apSlice from './appReducer';
import { productSlice } from './productReducer';

export const store = configureStore({
  reducer: {
    appReducer: apSlice,
    productReducer: productSlice
  },
});
console.log(store.appReducer)
