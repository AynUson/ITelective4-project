import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollabModalPage } from './collab-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CollabModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollabModalPageRoutingModule {}
