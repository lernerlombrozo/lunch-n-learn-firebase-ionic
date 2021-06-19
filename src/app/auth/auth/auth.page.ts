import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.page.scss'],
  templateUrl: './auth.page.html',
})
export class AuthPage {
  constructor(
    private readonly authService: AuthService,
    private readonly toastController: ToastController,
  ) {}

  public registerMode = false;

  public onSubmit(form: NgForm): void {
    if (this.registerMode) {
      this.register(form);
      return;
    }
    this.signIn(form);
  }

  public signIn(form: NgForm): void {
    this.authService.signInWithEmailAndPassword(form.value.email, form.value.password).catch(err => {
      this.presentToast(JSON.stringify(err));
    });
  }

  public register(form: NgForm): void {
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

  public toggleRegisterMode(): void {
    this.registerMode = !this.registerMode;
  }
}
