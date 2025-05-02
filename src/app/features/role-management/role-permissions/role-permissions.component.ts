import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role-permissions',
  standalone: false,
  templateUrl: './role-permissions.component.html',
  styleUrl: './role-permissions.component.scss',
})
export class RolePermissionsComponent {
  roleId!: number;
  roleName!: string;
  permissions = [
    { id: 1, name: 'View Reports', enabled: true },
    { id: 2, name: 'Edit Users', enabled: false },
    { id: 3, name: 'Manage Roles', enabled: true },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.roleId = +this.route.snapshot.paramMap.get('roleId')!;
    console.log('Managing permissions for role ID:', this.roleId);
    // Fetch permissions for the role from the server
    this.route.queryParams.subscribe((params) => {
      this.roleName = params['roleName'];
    });
    console.log('Managing permissions for role:', this.roleName, 'ID:', this.roleId);
    // Fetch permissions for the role from the server
  }

  togglePermission(permission: any): void {
    permission.enabled = !permission.enabled;
    console.log('Updated permission:', permission);
    // Send the updated permission to the server
  }
}
