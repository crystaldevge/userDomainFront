import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../core/services/role.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-role-management',
  standalone: false,
  templateUrl: './role-management.component.html',
  styleUrl: './role-management.component.scss',
})
export class RoleManagementComponent {
  roles: any[] = []; // Initialize roles array
  editingRoleId: number | null = null;
  creatingRole: boolean = false; // Track if the create mode is active
  newRoleName: string = ''; // Store the new role name
  constructor(
    private router: Router,
    private roleService: RoleService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchRoles();
  }

  toggleCreateMode(): void {
    this.creatingRole = true; // Show the input field for creating a new role
  }

  createRole(): void {
    if (!this.newRoleName.trim()) {
      this.notify.error('Role name cannot be empty!');
      return;
    }

    const newRole = { name: this.newRoleName.trim() };
    this.roleService.createRole(newRole).subscribe({
      next: (role) => {
        this.roles.push(role); // Add the new role to the list
        console.log('Role created:', role);
        this.creatingRole = false; // Exit create mode
        this.newRoleName = ''; // Reset the input field
      },
      error: (err) => {
        console.error('Error creating role:', err);
      },
    });
  }
  cancelCreate(): void {
    this.creatingRole = false; // Exit create mode
    this.newRoleName = ''; // Reset the input field
  }
  updateRole(role: any): void {
    const updatedRole = { ...role }; // Use the current role data for the update
    console.log('Updating role:', updatedRole); // Log the updated role data

    this.roleService.updateRole(role.id, updatedRole).subscribe({
      next: (updated) => {
        const index = this.roles.findIndex((r) => r.id === role.id);
        if (index !== -1) {
          this.roles[index] = updated;
        }
        console.log('Role updated:', updated);
      },
      error: (err) => {
        console.error('Error updating role:', err);
      },
    });
  }
  startEditing(roleId: number): void {
    this.editingRoleId = roleId; // Set the role being edited
  }

  saveRole(role: any): void {
    this.roleService.updateRole(role.id, { name: role.name }).subscribe({
      next: (updated) => {
        console.log('Role updated:', updated);
        this.editingRoleId = null; // Exit edit mode
      },
      error: (err) => {
        console.error('Error updating role:', err);
      },
    });
  }

  cancelEditing(): void {
    this.editingRoleId = null; // Exit edit mode without saving
  }
  fetchRoles(): void {
    this.roleService.getRoleList().subscribe({
      next: (response) => {
        this.roles = response.data; // Assign the fetched roles to the component's roles property
        console.log('Roles fetched:', response.data); // Log the fetched roles
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      },
    });
  }
  deleteRole(role: any): void {
    this.roleService.deleteRole(role.id).subscribe({
      next: () => {
        this.roles = this.roles.filter((r) => r.id !== role.id);
        console.log('Role deleted:', role);
      },
      error: (err) => {
        console.error('Error deleting role:', err);
      },
    });
  }
  managePermissions(role: any): void {
    this.router.navigate(['/roles', role.id, 'permissions'], {
      queryParams: { roleName: role.name }, // Pass roleName as a query parameter
    });
  }
}
