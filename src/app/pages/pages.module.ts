import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PagesPage } from './pages.page';
import { PagesPageRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [PagesPage],
  imports: [CommonModule, FormsModule, IonicModule, PagesPageRoutingModule],
})
export class PagesPageModule {}
