import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  ActionPerformed,
  PushNotifications,
  PushNotificationSchema,
  Token,
} from '@capacitor/push-notifications';
import { Subject } from 'rxjs';

import { PwaPushService } from './pwa-push.service';

@Injectable({
  providedIn: 'root',
})
export class PushService {
  constructor(private readonly pwaPushService: PwaPushService) {}

  public readonly token = new Subject<string>();

  public async startNotifications(): Promise<void> {
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
    if (!isPushNotificationsAvailable) {
      const token = await this.pwaPushService.initializeMessaging();
      this.token.next(token);
      return;
    }

    const hasPermissions = await PushNotifications.requestPermissions();
    if (hasPermissions.receive === 'granted') {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();
    }

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
      this.token.next(token.value);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      alert('Push received: ' + JSON.stringify(notification));
    });

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      alert('Push action performed: ' + JSON.stringify(notification));
    });
  }
}
