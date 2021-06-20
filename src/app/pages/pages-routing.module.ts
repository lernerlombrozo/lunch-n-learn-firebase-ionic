/* eslint-disable sort-keys */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage,
    children: [
      {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule),
      },
      {
        path: 'todo',
        loadChildren: () => import('./todo/todo.module').then(m => m.TodoPageModule),
      },
      {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
