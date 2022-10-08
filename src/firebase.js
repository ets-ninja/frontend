// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from 'firebase/messaging';

import { store } from './redux/store';
import { addNotification } from './redux/notifications/notificationsSlice';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(app);
    }
    console.log('Firebase not supported this browser');
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
})();

export const fetchToken = async setTokenFound => {
  try {
    const messagingResolve = await messaging;
    const currentToken = await getToken(messagingResolve, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
    });
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
    }
  } catch (err) {
    //console.log('An error occurred while retrieving token. ', err);
    setTokenFound(false);
  }
};

export const onMessageListener = async () => {
  const messagingResolve = await messaging;
  const message = onMessage(messagingResolve, payload => {
    console.log('On message: ', payload);
    store.dispatch(addNotification(payload));
    return payload;
  });
  return message;
};
