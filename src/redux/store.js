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
import userConfig from './user/userConfig';
import wishlistReducer from './wishlist/wishlistSlice';
import wishlistConfig from './wishlist/wishlistConfig';

export const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, userReducer),
    wishlist: persistReducer(wishlistConfig, wishlistReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
