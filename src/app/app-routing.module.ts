import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [authGuard],
    data: { roles: ['chef de direction technique'] }

  },
  {
    path: 'vehicule-stat',
    loadChildren: () => import('./vehicule-stat/vehicule-stat.module').then( m => m.VehiculeStatPageModule)
  },
  {
    path: 'order-stat',
    loadChildren: () => import('./order-stat/order-stat.module').then( m => m.OrderStatPageModule)
  },
  {
    path: 'consomation-stat',
    loadChildren: () => import('./consomation-stat/consomation-stat.module').then( m => m.ConsomationStatPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
