import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserListModule } from '../user-list/user-list.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, UserListModule, MaterialModule],
})
export class DashboardModule {}
