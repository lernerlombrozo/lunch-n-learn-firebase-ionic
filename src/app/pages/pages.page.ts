import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-pages',
  styleUrls: ['./pages.page.scss'],
  templateUrl: './pages.page.html',
})
export class PagesPage {
  public appPages = [
    { icon: 'person-circle', title: 'Profile', url: '/profile' },
    { icon: 'qr-code', title: 'Share User', url: '/qr' },
    { icon: 'heart', title: 'Favorites', url: '/folder/Favorites' },
    { icon: 'archive', title: 'Archived', url: '/folder/Archived' },
    { icon: 'trash', title: 'Trash', url: '/folder/Trash' },
    { icon: 'warning', title: 'Spam', url: '/folder/Spam' },
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly alertController: AlertController,
  ) {}

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
