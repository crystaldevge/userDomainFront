import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from '../../../core/services/permission.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-role-permissions',
  standalone: false,
  templateUrl: './role-permissions.component.html',
  styleUrls: ['./role-permissions.component.scss'],
})
export class RolePermissionsComponent {
  roleId!: number;
  roleName!: string;
  permissions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private permissionService: PermissionService,
    private notify: NotificationService 
  ) {}

  ngOnInit(): void {
    this.roleId = +this.route.snapshot.paramMap.get('roleId')!;
    console.log('Managing permissions for role ID:', this.roleId);
    console.log('this.roleId', this.roleId);
    
    // Fetch permissions for the role from the server
    this.route.queryParams.subscribe((params) => {
      this.roleName = params['roleName'];
    });
    console.log(
      'Managing permissions for role:',
      this.roleName,
      'ID:',
      this.roleId
    );
    this.loadPermissions(); // Load permissions for the role
    // Fetch permissions for the role from the server
  }
  loadPermissions(): void {
    this.permissionService.getPermissionsByRoleId(this.roleId).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.permissions = response.data.map((permission: any) => {
            // Parse the value if it's a stringified JSON
            let parsedValue = typeof permission.value === 'string'
              ? JSON.parse(permission.value)
              : permission.value;
  
            // Handle cases where value is null or undefined
            if (parsedValue === null || parsedValue === undefined) {
              parsedValue = null; // Keep it null for single toggle
            } else if (typeof parsedValue === 'object') {
              // Ensure installment and loan keys exist with default values
              if (parsedValue.installment === undefined) {
                parsedValue.installment = 0;
              }
              if (parsedValue.loan === undefined) {
                parsedValue.loan = 0;
              }
            }
  
            return {
              ...permission,
              value: parsedValue,
            };
          });
  
          console.log('Processed permissions:', this.permissions);
        } else {
          console.error('Failed to fetch permissions:', response.message.text);
        }
      },
      error: (err) => {
        console.error('Error fetching permissions:', err);
      },
    });
  }
  togglePermission(permission: any, key?: string): void {
    if (!permission.value) {
      // Initialize value if it doesn't exist
      permission.value = key ? { [key]: 1 } : 1;
    } else if (key) {
      // Toggle specific key (e.g., installment or loan)
      permission.value[key] = permission.value[key] === 1 ? 0 : 1;
    } else {
      // Toggle the entire permission value
      permission.value = permission.value === 1 ? 0 : 1;
    }
    console.log('Updated permission:', permission);
    // Optionally, send the updated permission to the server here
  }

  savePermissions(): void {
    const activePermissions = this.permissions
      .filter(p => p.value !== undefined && p.value !== null)
      .map(i => {
        let cleanedValue: any;
  
        if (typeof i.value === 'object' && i.value !== null) {
          cleanedValue = {};
          for (const key in i.value) {
            if (i.value[key] === 1) {
              cleanedValue[key] = 1;
            }
          }
        } else {
          cleanedValue = i.value;
        }
  
        return {
          id: i.id,
          value: cleanedValue
        };
      })
      .filter(p => {
        if (typeof p.value === 'object') {
          return Object.keys(p.value).length > 0;
        }
        return p.value === 1;
      });
  
    const requestBody = {
      roleId: this.roleId,
      activePermissions
    };
  
    this.permissionService.setUserPermissions(requestBody).subscribe({
      next: (res) => {
        console.log('Permissions saved successfully:', res);
        this.notify.success('Permissions saved successfully!');
      },
      error: (err) => {
        console.error('Error saving permissions:', err);
        this.notify.error('Failed to save permissions');
      }
    });
  }
  
  

}
