import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollabtaskModalPageRoutingModule } from './collabtask-modal-routing.module';

import { CollabtaskModalPage } from './collabtask-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollabtaskModalPageRoutingModule
  ],
  declarations: [CollabtaskModalPage]
})
export class CollabtaskModalPageModule {}
