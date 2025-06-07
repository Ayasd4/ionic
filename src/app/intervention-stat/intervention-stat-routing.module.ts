import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterventionStatPage } from './intervention-stat.page';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: InterventionStatPage, canActivate: [authGuard],
        data: { roles: ['chef de direction technique'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterventionStatPageRoutingModule {}
