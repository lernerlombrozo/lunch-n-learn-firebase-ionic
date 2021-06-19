// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: 'AIzaSyCh78nzMBSbvblWh1UoqjFL_3f4Pak_5f8',
    authDomain: 'lunch-n-learn-2.firebaseapp.com',
    projectId: 'lunch-n-learn-2',
    storageBucket: 'lunch-n-learn-2.appspot.com',
    messagingSenderId: '680706886936',
    appId: '1:680706886936:web:8c18553ae3c8b081f1a26d',
    measurementId: 'G-D4GF8CLM0J',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
