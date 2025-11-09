import { configureStore, combineReducers } from '@reduxjs/toolkit';
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
import agentReducer from './slices/agentSlice';
import serverReducer from './slices/serverSlice';

const serverPersistConfig = {
  key: 'server',
  storage,
  blacklist: ['searchQuery', 'sortBy'], // Don't persist searchQuery
};

const serverPersistedReducer = persistReducer(
  serverPersistConfig,
  serverReducer
);

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['agent', 'server'], // Persist agent and server state
};

const rootReducer = combineReducers({
  agent: agentReducer,
  server: serverPersistedReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
