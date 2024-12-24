import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todayReducer from './todayWaterList/sliсe.js';
import monthReducer from './monthWaterList/slice.js';
import authReducer from './auth/slice.js';

import waterRateReducer from './waterRate/slice.js';
import waterReducer from './water/slice.js';
import userReducer from './user/slice.js';
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    today: todayReducer,
    month: monthReducer,
    waterRate: waterRateReducer,
    water: waterReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
