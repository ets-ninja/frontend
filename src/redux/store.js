import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import userReducer from './user/userSlice';
import requestReducer from './request/requestSlice';

// for testing purposes, delete when redundant
import testExampleSlice from './testExample/testExampleSlice';
import testExampleConfig from './testExample/testExampleConfig';

export const store = configureStore({
  reducer: {
    testExample: persistReducer(testExampleConfig, testExampleSlice.reducer),
    user: userReducer,
    request: requestReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
