import storage from 'reduxjs-toolkit-persist/lib/storage';
import { createTransform } from 'reduxjs-toolkit-persist';

const isExpired = expiresAt => {
  if (!expiresAt) return true;
  const now = Date.now();
  return expiresAt < now;
};

const loginStatusExpireTransform = createTransform(
  (outboundState, key, { tokenExpiresAt }) => {
    switch (key) {
      case 'isLoggedIn':
        if (isExpired(tokenExpiresAt)) return false;
        break;

      case 'token':
        if (isExpired(tokenExpiresAt)) return null;
        break;

      case 'tokenExpiresAt':
        if (isExpired(tokenExpiresAt)) return null;
        break;

      default:
        return outboundState;
    }
    return outboundState;
  },
);

const config = {
  key: 'persistedAuth',
  storage,
  whitelist: ['token', 'tokenExpiresAt', 'isLoggedIn'],
  transforms: [loginStatusExpireTransform],
};

export default config;
