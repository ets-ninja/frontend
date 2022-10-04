import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
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

// Reducers
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import requestReducer from './request/requestSlice';
import modalSlice from './modal/modalSlice';
import modalConfig from './modal/modalConfig';

// Actions
import { refresh } from './auth/authActions';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  type: 'persist/REHYDRATE',
  effect: async (action, listenerApi) => {
    if (!action.payload && action.key === 'persistedAuth') {
      console.log('DO STUFF');
      listenerApi.dispatch(refresh());
    } else if (
      action.payload.token === null &&
      action.key === 'persistedAuth'
    ) {
      console.log('DO STUFF');
      listenerApi.dispatch(refresh());
    } else {
      listenerApi.cancelActiveListeners();
    }
  },
});

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    user: userReducer,
    modal: persistReducer(modalConfig, modalSlice.reducer),
    request: requestReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(listenerMiddleware.middleware),
});

export const persistor = persistStore(store);
