import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollabModalPageRoutingModule } from './collab-modal-routing.module';

import { CollabModalPage } from './collab-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollabModalPageRoutingModule
  ],
  declarations: [CollabModalPage]
})
export class CollabModalPageModule {}
