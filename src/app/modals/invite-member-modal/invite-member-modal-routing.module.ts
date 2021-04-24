import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InviteMemberModalPage } from './invite-member-modal.page';

const routes: Routes = [
  {
    path: '',
    component: InviteMemberModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InviteMemberModalPageRoutingModule {}
