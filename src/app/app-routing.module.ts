import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { guestGuardGuard } from './core/guards/guest-guard.guard';
import { authGuardGuard } from './core/guards/auth-guard.guard';
import { UserProfileComponent } from './features/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
