import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollabtaskModalPage } from './collabtask-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CollabtaskModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollabtaskModalPageRoutingModule {}
