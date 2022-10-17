/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js',
);
importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@6/dist/umd.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyABYrT1VKB72YWBQmlwWayr7G6Uvwak9w8',
  authDomain: 'honeymoneyworker.firebaseapp.com',
  projectId: 'honeymoneyworker',
  storageBucket: 'honeymoneyworker.appspot.com',
  messagingSenderId: '706857741672',
  appId: '1:706857741672:web:b22cb85d9e97fa89c1fadd',
};

// Retrieve firebase messaging
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

let channel;

const getChannel = () => {
  let channel = new BroadcastChannel('sw-messages');
  return channel;
};

const notificationChannel = {
  getInstance: () => {
    if (channel === undefined || channel === null) {
      channel = getChannel();
    }
    return channel;
  },
};

messaging.onBackgroundMessage(payload => {
  payload.messageId = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16),
  );

  const updateDB = async () => {
    try {
      const notificationList = await idbKeyval.get('notificationList');
      if (notificationList) {
        notificationList.unshift(payload);
        idbKeyval.set('notificationList', notificationList);
      } else {
        idbKeyval.set('notificationList', [payload]);
      }
    } catch (error) {}
  };

  updateDB();

  const channel = notificationChannel.getInstance();

  channel.postMessage(payload);
});
