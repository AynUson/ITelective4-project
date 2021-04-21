import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryViewPageRoutingModule } from './category-view-routing.module';

import { CategoryViewPage } from './category-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryViewPageRoutingModule
  ],
  declarations: [CategoryViewPage]
})
export class CategoryViewPageModule {}
