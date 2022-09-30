import storage from 'redux-persist/lib/storage';

const userConfig = {
  key: 'userToken',
  storage,
  whitelist: ['userToken'],
};

export default userConfig;
