import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingreqModalPageRoutingModule } from './pendingreq-modal-routing.module';

import { PendingreqModalPage } from './pendingreq-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingreqModalPageRoutingModule
  ],
  declarations: [PendingreqModalPage]
})
export class PendingreqModalPageModule {}
