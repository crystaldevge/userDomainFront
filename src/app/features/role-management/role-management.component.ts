import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../core/services/role.service';
import { NotificationService } from '../../core/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
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
  originalRoleName: string = '';
  constructor(
    private router: Router,
    private roleService: RoleService,
    private notify: NotificationService,
    private dialog: MatDialog
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
      next: (res) => {
        const createdRole = {
          ...newRole,
          id: res.data?.id || null
        };
  
        this.roles.push(createdRole);
        console.log('Role created:', createdRole);
  
        const message = res?.message?.text || 'Role created successfully';
        this.notify.success(message);
  
        this.creatingRole = false;
        this.newRoleName = '';
      },
      error: (err) => {
        console.error('Error creating role:', err);
        const message = err?.error?.message?.text || 'An unexpected error occurred';
        this.notify.error(message);
      },
    });
  }
  
  cancelCreate(): void {
    this.creatingRole = false; // Exit create mode
    this.newRoleName = ''; // Reset the input field
  }

  
  updateRole(role: any): void {
    const updatedRole = { ...role }; 
  
    this.roleService.updateRole(role.id, updatedRole).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          const index = this.roles.findIndex((r) => r.id === role.id);
          if (index !== -1) {
           
            this.roles[index] = { ...this.roles[index], ...updatedRole };
          }
          console.log('Role updated:', response);
          this.notify.success(response.message?.text || 'Role updated successfully');
        } else {
          this.notify.error(response.message?.text || 'Failed to update role');
        }
      },
      error: (err) => {
        console.error('Error updating role:', err);
        this.notify.error(err?.error?.message?.text || 'An error occurred while updating the role');
        },
    });
  }
  


  startEditing(roleId: number, role: any): void {
    this.editingRoleId = roleId; // Set the role being edited
    this.originalRoleName = role.name; 
  }

  saveRole(role: any): void {
    this.roleService.updateRole(role.id, { name: role.name }).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.notify.success(response.message?.text || 'Role updated successfully');
          this.editingRoleId = null;
        } else {
          this.notify.error(response.message?.text || 'Failed to update role');
          role.name = this.originalRoleName; 
        }
      },
      error: (err) => {
        console.error('Error updating role:', err);
        this.notify.error(err?.error?.message?.text || 'An error occurred while updating the role');
        role.name = this.originalRoleName; 
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


    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: `Delete role "${role.name}"?` }
    });
  
    
    dialogRef.afterClosed().subscribe(result => {

          (document.activeElement as HTMLElement)?.blur();

      if (result) {
        this.roleService.deleteRole(role.id).subscribe({
          next: (res) => {
            this.roles = this.roles.filter((r) => r.id !== role.id);
            console.log('Role deleted:', role);
            const message = res?.message?.text || 'Role deleted successfully';
            this.notify.success(message);
          },
          error: (err) => {
            console.error('Error deleting role:', err);
            const message = err?.error?.message?.text || 'An unexpected error occurred';
            this.notify.error(message);
          },
        });
    
      }
    });


  }
  managePermissions(role: any): void {
    this.router.navigate(['/roles', role.id, 'permissions'], {
      queryParams: { roleName: role.name }, // Pass roleName as a query parameter
    });
  }
}
