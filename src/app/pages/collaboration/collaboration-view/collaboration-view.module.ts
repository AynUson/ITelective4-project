import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollaborationViewPageRoutingModule } from './collaboration-view-routing.module';

import { CollaborationViewPage } from './collaboration-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollaborationViewPageRoutingModule
  ],
  declarations: [CollaborationViewPage]
})
export class CollaborationViewPageModule {}
