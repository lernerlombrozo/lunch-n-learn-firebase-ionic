/* eslint-disable sort-keys */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule),
  },
  {
    path: 'password',
    loadChildren: () => import('./password/password.module').then(m => m.PasswordPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
