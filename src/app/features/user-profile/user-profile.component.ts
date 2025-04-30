import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  userProfile: any = {};
  userPermissions: any[] = [];
  userModules: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadPermissions(): void {
    this.authService.getPermissions().subscribe({
      next: (per) => {
        this.userPermissions = Array.isArray(per.data.permissions)
          ? per.data.permissions
          : per.data.permissions.permissions || [];
      },
      error: (err) => {
        console.error('Error fetching permissions:', err);
      },
    });
  }

  loadModules(): void {
    this.authService.getModules().subscribe({
      next: (modules) => {
        this.userModules = Array.isArray(modules.data.modules)
          ? modules.data.modules
          : modules.data.modules.modules || [];
      },
      error: (err) => {
        console.error('Error fetching modules:', err);
      },
    });
  }

  loadUserProfile(): void {
    this.authService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile.data.userProfile;
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
      },
    });
  }
}
