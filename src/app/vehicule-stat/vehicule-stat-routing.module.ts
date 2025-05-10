import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiculeStatPage } from './vehicule-stat.page';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: VehiculeStatPage, canActivate: [authGuard],
        data: { roles: ['chef de direction technique'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiculeStatPageRoutingModule {}
