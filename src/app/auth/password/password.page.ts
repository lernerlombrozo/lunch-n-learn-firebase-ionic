import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-password',
  styleUrls: ['./password.page.scss'],
  templateUrl: './password.page.html',
})
export class PasswordPage {
  constructor(
    private readonly authService: AuthService,
    private readonly toastController: ToastController,
  ) {}

  public onSubmit(form: NgForm): void {
    this.authService.createUserWithEmailAndPassword(form.value.email, form.value.password).catch(err => {
      this.presentToast(JSON.stringify(err));
    });
  }

  private async presentToast(err: string): Promise<void> {
    const toast = await this.toastController.create({
      duration: 2000,
      message: err,
    });
    toast.present();
  }
}
