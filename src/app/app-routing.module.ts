import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modals/modal/modal.module').then( m => m.ModalPageModule)
  },  {
    path: 'collab-modal',
    loadChildren: () => import('./modals/collab-modal/collab-modal.module').then( m => m.CollabModalPageModule)
  },
  {
    path: 'collabtask-modal',
    loadChildren: () => import('./modals/collabtask-modal/collabtask-modal.module').then( m => m.CollabtaskModalPageModule)
  },
  {
    path: 'invite-member-modal',
    loadChildren: () => import('./modals/invite-member-modal/invite-member-modal.module').then( m => m.InviteMemberModalPageModule)
  },
  {
    path: 'pendingreq-modal',
    loadChildren: () => import('./modals/pendingreq-modal/pendingreq-modal.module').then( m => m.PendingreqModalPageModule)
  },
  {
    path: 'view-members',
    loadChildren: () => import('./modals/view-members/view-members.module').then( m => m.ViewMembersPageModule)
  },
  {
    path: 'view-done-tasks',
    loadChildren: () => import('./modals/view-done-tasks/view-done-tasks.module').then( m => m.ViewDoneTasksPageModule)
  },
  {
    path: 'view-task',
    loadChildren: () => import('./modals/view-task/view-task.module').then( m => m.ViewTaskPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
