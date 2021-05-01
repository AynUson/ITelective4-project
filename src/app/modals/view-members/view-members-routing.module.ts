import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMembersPage } from './view-members.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMembersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMembersPageRoutingModule {}
