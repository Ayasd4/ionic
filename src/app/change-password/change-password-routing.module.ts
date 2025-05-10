import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePasswordPage } from './change-password.page';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordPage, canActivate: [authGuard],
        data: { roles: ['chef de direction technique'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePasswordPageRoutingModule {}
