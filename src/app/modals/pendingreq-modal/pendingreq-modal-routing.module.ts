import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingreqModalPage } from './pendingreq-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PendingreqModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingreqModalPageRoutingModule {}
