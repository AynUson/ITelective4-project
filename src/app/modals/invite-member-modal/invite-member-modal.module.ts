import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InviteMemberModalPageRoutingModule } from './invite-member-modal-routing.module';

import { InviteMemberModalPage } from './invite-member-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InviteMemberModalPageRoutingModule
  ],
  declarations: [InviteMemberModalPage]
})
export class InviteMemberModalPageModule {}
