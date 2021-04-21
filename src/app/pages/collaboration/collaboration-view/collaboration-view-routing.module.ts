import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollaborationViewPage } from './collaboration-view.page';

const routes: Routes = [
  {
    path: '',
    component: CollaborationViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollaborationViewPageRoutingModule {}
