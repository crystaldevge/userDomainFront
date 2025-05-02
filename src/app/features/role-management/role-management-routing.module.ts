import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleManagementComponent } from './role-management.component';
import { RolePermissionsComponent } from './role-permissions/role-permissions.component';

const routes: Routes = [
  { path: '', component: RoleManagementComponent }, // List of roles
  { path: ':roleId/permissions', component: RolePermissionsComponent }, // Role permissions
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleManagementRoutingModule {}
