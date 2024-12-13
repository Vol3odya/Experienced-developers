import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import waterReducer from './todayWaterList/sliсe.js';
import authSlise from './auth/slice.js';

const persistConfig = {
  key: 'root',
  storage,
  whitelist:['token'],
};

const persistedReducer = persistReducer(persistConfig, authSlise);

export const store = configureStore({
  reducer: {
    water: waterReducer, 
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export const persistor = persistStore(store);