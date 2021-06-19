import { Component } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { PushService } from './services/push/push.service';
import { SessionService } from './services/session/session.service';
@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  public appPages = [
    { icon: 'mail', title: 'Inbox', url: '/folder/Inbox' },
    { icon: 'paper-plane', title: 'Outbox', url: '/folder/Outbox' },
    { icon: 'heart', title: 'Favorites', url: '/folder/Favorites' },
    { icon: 'archive', title: 'Archived', url: '/folder/Archived' },
    { icon: 'trash', title: 'Trash', url: '/folder/Trash' },
    { icon: 'warning', title: 'Spam', url: '/folder/Spam' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private readonly pushService: PushService,
    private readonly router: Router,
    private readonly sessionService: SessionService,
  ) {}

  public ngOnInit(): void {
    firebase.initializeApp(environment.firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid, displayName, email, emailVerified, phoneNumber, photoURL } = user;
        this.sessionService.setSession({ uid, displayName, email, emailVerified, phoneNumber, photoURL });
        this.startNotifications(uid);
        this.router.navigate(['']);
      } else {
        this.router.navigate(['/auth']);
        this.sessionService.clearSession();
      }
    });
  }

  private startNotifications(uid: string) {
    this.pushService.token.subscribe(firebaseToken => {
      if (firebaseToken) {
        this.sessionService.updateSession({ firebaseToken });
        this.saveToken(firebaseToken, uid);
      }
    });
    this.pushService.startNotifications();
  }

  private saveToken(token: string, uid: string) {
    console.log('Todo: save token to user', token, uid);
  }
}
