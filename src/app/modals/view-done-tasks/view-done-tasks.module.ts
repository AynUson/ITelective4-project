import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDoneTasksPageRoutingModule } from './view-done-tasks-routing.module';

import { ViewDoneTasksPage } from './view-done-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDoneTasksPageRoutingModule
  ],
  declarations: [ViewDoneTasksPage]
})
export class ViewDoneTasksPageModule {}
