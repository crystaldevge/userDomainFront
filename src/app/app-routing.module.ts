import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { guestGuardGuard } from './core/guards/guest-guard.guard';
import { authGuardGuard } from './core/guards/auth-guard.guard';
import { UserProfileComponent } from './features/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [guestGuardGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [authGuardGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/user-profile/user-profile.module').then(
        (m) => m.UserProfileModule
      ),
  },
  {
    path: 'user-details/:id',
    loadChildren: () =>
      import('./features/user-details/user-details.module').then(
        (m) => m.UserDetailsModule
      ),
  },
  {
    path: 'roles',
    loadChildren: () =>
      import('./features/role-management/role-management.module').then(
        (m) => m.RoleManagementModule
      ),
  },
  { path: '**', redirectTo: '/login' }, // Wildcard route for undefined paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
