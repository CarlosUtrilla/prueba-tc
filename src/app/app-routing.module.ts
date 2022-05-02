import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateUserGuard } from './guards/validate-user.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [ValidateUserGuard],
    canLoad: [ValidateUserGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
