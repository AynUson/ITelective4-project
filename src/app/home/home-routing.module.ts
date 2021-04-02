import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children:[
      {
        path:'dashboard',
        loadChildren: ()=> import('../pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path:'profile',
        loadChildren: ()=> import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path:'shop',
        loadChildren: ()=> import('../pages/shop/shop.module').then(m => m.ShopPageModule)
      },
      {
        path:'collaboration',
        loadChildren: ()=> import('../pages/collaboration/collaboration.module').then(m => m.CollaborationPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}