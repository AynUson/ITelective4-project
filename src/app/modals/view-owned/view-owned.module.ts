import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewOwnedPageRoutingModule } from './view-owned-routing.module';

import { ViewOwnedPage } from './view-owned.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewOwnedPageRoutingModule
  ],
  declarations: [ViewOwnedPage]
})
export class ViewOwnedPageModule {}
