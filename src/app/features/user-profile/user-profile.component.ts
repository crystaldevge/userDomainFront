import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { ModuleService } from '../../core/services/module.service';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userProfile: any = {};
  userPermissions: any[] = [];
  userModules: any[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private moduleService: ModuleService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }
showPermissions = false;
showModules = false;  



loadPermissions(): void {
  if (!this.showPermissions) {
    this.authService.getPermissions().subscribe({
      next: (per) => {
        this.userPermissions = Array.isArray(per.data.permissions)
          ? per.data.permissions
          : per.data.permissions.permissions || [];
        this.showPermissions = true;
      },
      error: (err) => {
        console.error('Error fetching permissions:', err);
      },
    });
  } else {
    this.showPermissions = false;
  }
}


loadModules(): void {
  if (!this.showModules) {
    this.moduleService.getModules().subscribe({
      next: (modules) => {
        this.userModules = Array.isArray(modules.data.modules)
          ? modules.data.modules
          : modules.data.modules.modules || [];
        this.showModules = true;
      },
      error: (err) => {
        console.error('Error fetching modules:', err);
      },
    });
  } else {
    this.showModules = false;
  }
}

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile.data.userProfile;
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
      },
    });
  }
}
