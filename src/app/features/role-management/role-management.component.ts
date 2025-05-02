import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-management',
  standalone: false,
  templateUrl: './role-management.component.html',
  styleUrl: './role-management.component.scss',
})
export class RoleManagementComponent {
  constructor(private router: Router) {}
  roles = [
    { id: 1, name: 'System Administrator' },
    { id: 2, name: 'Supplier' },
    { id: 3, name: 'Avatar' },
    { id: 4, name: 'Report Manager' },
  ];
  ngOnInit(): void {}

  managePermissions(role: any): void {
    this.router.navigate(['/roles', role.id, 'permissions'], {
      queryParams: { roleName: role.name }, // Pass roleName as a query parameter
    });
  }
}
