import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderStatPage } from './order-stat.page';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: OrderStatPage, canActivate: [authGuard],
        data: { roles: ['chef de direction technique'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderStatPageRoutingModule {}
