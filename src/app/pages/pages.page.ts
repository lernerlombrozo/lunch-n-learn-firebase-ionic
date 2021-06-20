import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-pages',
  styleUrls: ['./pages.page.scss'],
  templateUrl: './pages.page.html',
})
export class PagesPage {
  public appPages = [
    { icon: 'chatbox', title: 'Chat', url: '/chat' },
    { icon: 'list', title: 'Todo List', url: '/todo' },
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly alertController: AlertController,
    private readonly sessionService: SessionService,
  ) {}

  public get session() {
    return this.sessionService.session;
  }

  public async showSignOutConfirmAlert(): Promise<void> {
    const alert = await this.alertController.create({
      buttons: [
        {
          role: 'cancel',
          text: 'Cancel',
        },
        {
          cssClass: 'error',
          handler: () => {
            this.signOut();
          },
          text: 'Sign Out',
        },
      ],
      header: 'Sign Out',
      message: 'Are you sure you want to <strong>Sign Out</strong>!!!',
    });
    await alert.present();
  }

  private signOut(): void {
    this.authService.signOut();
  }
}
