import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = [
    'select',
    'username',
    'firstName',
    'lastName',
    'roleName',
    'isActive',
    'edit',
  ]; // Columns to display
  dataSource = new MatTableDataSource<any>();
  totalUsers = 0;
  pageSize = 10;
  currentPage = 0;
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Paginator reference
  @ViewChild(MatSort) sort!: MatSort; // Sort reference

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.loadUsers(this.currentPage, this.pageSize);
  }

  onPageChange(event: any): void {
    console.log('Page changed:', event);

    this.currentPage = event.pageIndex; // Get the current page index
    this.pageSize = event.pageSize; // Get the selected page size
    console.log('Current page:', this.currentPage, 'Page size:', this.pageSize);

    const skip = this.currentPage * this.pageSize; // Calculate the skip value
    this.loadUsers(skip, this.pageSize); // Fetch the next set of users
  }

  onEdit(user: any): void {
    console.log('Edit user:', user);
    // Add your edit logic here, e.g., navigate to an edit form or open a dialog
  }
  loadUsers(skip: number, fetch: number): void {
    this.authService.getUsers(skip, fetch).subscribe({
      next: (data) => {
        this.dataSource.data = data.data.userList; // Assign the user list to the data source
        this.totalUsers = data.data.userList.total;
        this.dataSource.paginator = this.paginator; // Assign paginator
        this.dataSource.sort = this.sort; // Assign sorting
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Apply filter
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Reset to the first page
    }
  }
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  isSomeSelected(): boolean {
    return this.selection.selected.length > 0 && !this.isAllSelected();
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  toggleSelection(row: any): void {
    this.selection.toggle(row);
  }

  logout(): void {
    this.authService.logout(); // Clear the token
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
