import { configureStore } from '@reduxjs/toolkit';
import apSlice from './appReducer';
import { productSlice } from './productReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userSlice from './userSlice';
import appReducer from './appReducer';

const commonConfig = {
  key: 'shop/user',
  storage
};

const userConfig = {
  ...commonConfig,
  whiteList: ['isLogin', 'token'],
};

export const store = configureStore({
  reducer: {
    userReducer: persistReducer(userConfig, userSlice),
    productReducer: productSlice,
    appReducer: appReducer
  },
});

export const persistor = persistStore(store);

