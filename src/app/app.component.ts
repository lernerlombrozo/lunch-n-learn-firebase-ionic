import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { PushService } from './services/push/push.service';
import { RealtimeDatabaseService } from './services/realtime-database/realtime-database.service';
import { SessionService } from './services/session/session.service';
@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly pushService: PushService,
    private readonly router: Router,
    private readonly sessionService: SessionService,
    private readonly realtimeDatabaseService: RealtimeDatabaseService,
  ) {}

  public ngOnInit(): void {
    console.log('app started');
    firebase.initializeApp(environment.firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid, email, phoneNumber } = user;
        this.sessionService.setSession({ uid, email, phoneNumber });
        this.startNotifications(uid);
        this.router.navigate(['']);
      } else {
        this.router.navigate(['/auth']);
        this.sessionService.clearSession();
      }
    });
  }

  private startNotifications(uid: string) {
    this.pushService.token.subscribe(token => {
      if (token) {
        this.saveToken(token, uid);
      }
    });
    this.pushService.startNotifications();
  }

  private async saveToken(token: string, uid: string) {
    try {
      this.realtimeDatabaseService.write(`/tokens/${uid}`, token);
    } catch (err) {
      console.log(err);
    }
  }
}
