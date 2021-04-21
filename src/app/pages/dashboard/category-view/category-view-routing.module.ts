import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryViewPage } from './category-view.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryViewPageRoutingModule {}
