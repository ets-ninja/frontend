import storage from 'reduxjs-toolkit-persist/lib/storage';

const modalConfig = {
  key: 'modal',
  storage,
  whitelist: ['data'],
};

export default modalConfig;
