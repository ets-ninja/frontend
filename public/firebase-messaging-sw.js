/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js',
);

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
