import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/messaging';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PwaPushService {
  public async initializeMessaging(): Promise<string> {
    const messaging = firebase.messaging();
    console.log('attempting fb service worker registration successful');
    const serviceWorkerRegistration = await navigator.serviceWorker.register(
      `assets/service-workers/${environment.firebaseMessagingServiceWorkerFile}`,
    );
    console.log('service worker registration successful');
    const currentToken = await messaging.getToken({
      serviceWorkerRegistration,
      vapidKey: environment.firebaseWebPushCertificate,
    });
    this.handleIncomingMessages(messaging);
    if (!currentToken) {
      console.log('should require permissions');
    }
    return currentToken;
  }

  private handleIncomingMessages(messaging: firebase.messaging.Messaging): void {
    messaging.onMessage(payload => {
      console.log('Message received. ', payload);
    });
  }
}
