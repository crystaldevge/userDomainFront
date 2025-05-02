import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsRoutingModule } from './user-details-routing.module';
import { UserDetailsComponent } from './user-details.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [CommonModule, UserDetailsRoutingModule, MaterialModule],
  exports: [UserDetailsComponent],
})
export class UserDetailsModule {}
