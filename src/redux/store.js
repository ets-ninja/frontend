import { configureStore, createListenerMiddleware  } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'reduxjs-toolkit-persist';
import authPersistConfig from './auth/authPersistConfig';


import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import requestReducer from './request/requestSlice';
import wishlistReducer from './wishlist/wishlistSlice';
import wishlistConfig from './wishlist/wishlistConfig';


import creationBasketReducer from './basket/createBasketSlice'
import modalSlice from './modal/modalSlice';
import modalConfig from './modal/modalConfig';
import publicSlice from './public/publicSlice';
import notificationReducer from './notifications/notificationSlice';
import notificationConfig from './notifications/notificationConfig';

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    user: userReducer,
    wishlist: persistReducer(wishlistConfig, wishlistReducer),
    creationBasket: creationBasketReducer,
    modal: persistReducer(modalConfig, modalSlice.reducer),
    request: requestReducer,
    public: publicSlice.reducer,
    notification: persistReducer(notificationConfig, notificationReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
