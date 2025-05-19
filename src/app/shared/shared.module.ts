import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MaterialModule } from '../material/material.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './components/notification/notification.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    SidebarComponent,
    NotificationComponent,
    ConfirmDialogComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    SidebarComponent,
    NotificationComponent
  ],
})
export class SharedModule {}
