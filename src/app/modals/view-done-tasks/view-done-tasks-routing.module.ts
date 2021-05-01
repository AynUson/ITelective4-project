import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDoneTasksPage } from './view-done-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDoneTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDoneTasksPageRoutingModule {}
