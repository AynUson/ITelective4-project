import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMembersPageRoutingModule } from './view-members-routing.module';

import { ViewMembersPage } from './view-members.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMembersPageRoutingModule
  ],
  declarations: [ViewMembersPage]
})
export class ViewMembersPageModule {}
