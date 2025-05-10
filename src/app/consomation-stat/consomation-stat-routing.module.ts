import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsomationStatPage } from './consomation-stat.page';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ConsomationStatPage, canActivate: [authGuard],
    data: { roles: ['chef de direction technique'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsomationStatPageRoutingModule { }
