import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './core/interceptors/auth-interceptor.service';
import { MaterialModule } from './material/material.module';
import { ErrorInterceptorService } from './core/interceptors/error-interceptor.service';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { UserProfileModule } from './features/user-profile/user-profile.module';
import { RoleManagementModule } from './features/role-management/role-management.module';
import { UserDetailsModule } from './features/user-details/user-details.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Add HttpClientModule here
    CoreModule,
    SharedModule,
    MaterialModule,
    DashboardModule,
    UserProfileModule,
    RoleManagementModule,
    UserDetailsModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }, // Auth Interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    }, // Error Interceptor
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
