import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing.module';
import { RoleManagementComponent } from './role-management.component';
import { RolePermissionsComponent } from './role-permissions/role-permissions.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RoleModulesComponent } from './role-modules/role-modules.component';

@NgModule({
  declarations: [RoleManagementComponent, RolePermissionsComponent, RoleModulesComponent],
  imports: [
    CommonModule,
    RoleManagementRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule
  ],
  exports: [RoleManagementComponent, RolePermissionsComponent],
})
export class RoleManagementModule {}
