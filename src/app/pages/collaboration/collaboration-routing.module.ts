import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollaborationPage } from './collaboration.page';

const routes: Routes = [
  {
    path: '',
    component: CollaborationPage
  },
  {
    path: 'collaboration-view',
    loadChildren: () => import('./collaboration-view/collaboration-view.module').then( m => m.CollaborationViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollaborationPageRoutingModule {}
