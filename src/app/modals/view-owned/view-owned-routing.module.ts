import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewOwnedPage } from './view-owned.page';

const routes: Routes = [
  {
    path: '',
    component: ViewOwnedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewOwnedPageRoutingModule {}
