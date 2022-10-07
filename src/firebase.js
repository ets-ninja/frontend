// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyABYrT1VKB72YWBQmlwWayr7G6Uvwak9w8',
  authDomain: 'honeymoneyworker.firebaseapp.com',
  projectId: 'honeymoneyworker',
  storageBucket: 'honeymoneyworker.appspot.com',
  messagingSenderId: '706857741672',
  appId: '1:706857741672:web:b22cb85d9e97fa89c1fadd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export const fetchToken = setTokenFound => {
  if (messaging) {
    return getToken(messaging, {
      vapidKey:
        'BIEZhDExu8jMeMqIFWAYMIYeVICJcXPsgeJwGsKSSIuDKGsFY8SSYGrKl6S23cDIEpiJgloHSPUwg2prgFVQz7A',
    })
      .then(currentToken => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          setTokenFound(true);
          // Track the token -> client mapping, by sending to backend server
          // show on the UI that permission is secured
        } else {
          console.log(
            'No registration token available. Request permission to generate one.',
          );
          setTokenFound(false);
          // shows on the UI that permission is required
        }
      })
      .catch(err => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
      });
  }
};

export const onMessageListener = () =>
  new Promise(resolve => {
    onMessage(messaging, payload => {
      resolve(payload);
    });
  });
