import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  version: 1,
  timeout: 100000,
  whitelist: ['selectedSong'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
