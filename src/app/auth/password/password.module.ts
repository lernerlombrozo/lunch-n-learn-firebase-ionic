import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PasswordPage } from './password.page';
import { PasswordPageRoutingModule } from './password-routing.module';

@NgModule({
  declarations: [PasswordPage],
  imports: [CommonModule, FormsModule, IonicModule, PasswordPageRoutingModule],
})
export class PasswordPageModule {}
