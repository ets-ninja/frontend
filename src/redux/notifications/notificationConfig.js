import storage from 'reduxjs-toolkit-persist/lib/storage';

const notificationConfig = {
  key: 'notification',
  whitelist: ['notificationList'],
  storage,
};

export default notificationConfig;
