import { configureStore } from '@reduxjs/toolkit';
import { productSlice } from './productReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userSlice from './userSlice';
import appReducer from './appReducer';
import brandSlice from './brandSlice';
import oauth2Slice from './oauth2Reducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const commonConfig = {
  key: 'shop/user',
  storage
};

const oauth2CommonConfig = {
  key: 'shop/oauth2',
  storage,
  stateReconciler: autoMergeLevel2
}

const userConfig = {
  ...commonConfig,
  whiteList: ['isLogin', 'token', 'current', 'currentCart'],
};

const oauth2Config = {
  ...oauth2CommonConfig,
  whiteList: ['isOauth2Login', 'token'],
}

export const store = configureStore({
  reducer: {
    userReducer: persistReducer(userConfig, userSlice),
    oauth2Reducer: persistReducer(oauth2Config, oauth2Slice),
    productReducer: productSlice,
    appReducer: appReducer,
    brandReducer: brandSlice
  },
});

export const persistor = persistStore(store);

