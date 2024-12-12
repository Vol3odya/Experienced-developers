import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import contactsReducer from './todayWaterList/slise';
import filtersReducer from "./filters/slise";
import authSlise from './auth/slise';

const persistConfig = {
  key: 'root',
  storage,
  whitelist:['token'],
};

const persistedReducer = persistReducer(persistConfig, authSlise);

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,  
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