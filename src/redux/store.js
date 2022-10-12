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
import userConfig from './user/userConfig';

import creationBasketReducer from './basket/createBasketSlice'
import modalSlice from './modal/modalSlice';
import modalConfig from './modal/modalConfig';

export const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, userReducer),
    creationBasket: creationBasketReducer,
    modal: persistReducer(modalConfig, modalSlice.reducer),
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
