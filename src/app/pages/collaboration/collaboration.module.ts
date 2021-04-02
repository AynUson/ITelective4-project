import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollaborationPageRoutingModule } from './collaboration-routing.module';

import { CollaborationPage } from './collaboration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollaborationPageRoutingModule
  ],
  declarations: [CollaborationPage]
})
export class CollaborationPageModule {}
