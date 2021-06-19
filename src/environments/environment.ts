// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseMessagingServiceWorkerFile: 'firebase-messaging-sw.js',
  firebaseConfig: {
    apiKey: 'AIzaSyCh78nzMBSbvblWh1UoqjFL_3f4Pak_5f8',
    authDomain: 'lunch-n-learn-2.firebaseapp.com',
    projectId: 'lunch-n-learn-2',
    storageBucket: 'lunch-n-learn-2.appspot.com',
    messagingSenderId: '680706886936',
    appId: '1:680706886936:web:8c18553ae3c8b081f1a26d',
    measurementId: 'G-D4GF8CLM0J',
  },
  firebaseWebPushCertificate:
    'BBHZ_ElGjCP8Gi-uKeJ2Z8j_e_wH4V2PsU97ddVZKmHHw5w2ZzAB-_vMHH79pOtwNLyTmxG1rTnq0pD3uyDMm60',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
