import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
/* eslint-disable sort-keys */
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [],
  imports: [IonicModule, HttpClientTestingModule, FormsModule, RouterTestingModule],
  exports: [IonicModule, HttpClientTestingModule, FormsModule, RouterTestingModule],
})
export class TestingModule {}
