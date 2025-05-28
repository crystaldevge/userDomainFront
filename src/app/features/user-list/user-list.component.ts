import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
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
  filterColumns: string[] = [
    'select',
    'username',
    'firstName',
    'lastName',
    'roleName',
    'isActive',
    'edit',
  ];
  dataSource = new MatTableDataSource<any>();
  totalUsers = 0;
  pageSize = 10;
  currentPage = 0;
  selection = new SelectionModel<any>(true, []);
  columnFilters: { [key: string]: string } = {};
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Paginator reference
  @ViewChild(MatSort) sort!: MatSort; // Sort reference

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}
  ngOnInit(): void {
    // this.loadUsers(this.currentPage, this.pageSize);
    this.loadUsers();
  }

  // onPageChange(event: any): void {
  //   console.log('Page changed:', event);
  //   this.currentPage = event.pageIndex; // Get the current page index
  //   this.pageSize = event.pageSize; // Get the selected page size
  //   console.log('Current page:', this.currentPage, 'Page size:', this.pageSize);
  //   const skip = this.currentPage * this.pageSize; // Calculate the skip value
  //   this.loadUsers(skip, this.pageSize); // Fetch the next set of users
  // }

  onEdit(user: any): void {
    console.log('Edit user:', user); // Check the user object
    if (!user.id) {
      console.error('User ID is undefined!');
      return;
    }
    this.router.navigate(['/user-details', user.id]);
  }



  // loadUsers(skip: number, fetch: number): void {
  //   this.userService.getUsers(skip, fetch).subscribe({
  //     next: (data) => {
  //       console.log('Fetched users:', data.data.userList); // Check the response data
        
  //       this.dataSource.data = data.data.userList; // Assign the user list to the data source
  //       this.totalUsers = data.data.userList.total;
  //       this.dataSource.paginator = this.paginator; // Assign paginator
  //       this.dataSource.sort = this.sort; // Assign sorting
  //     },
  //     error: (err) => {
  //       console.error('Error fetching users:', err);
  //     },
  //   });
  // }

  loadUsers(): void {
    this.userService.getUsers(0, 10000).subscribe({
      next: (data) => {
        this.users = data.data.userList;
        this.dataSource = new MatTableDataSource(this.users);
        this.totalUsers = this.users.length;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
  applyColumnFilter(column: string, event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.columnFilters[column] = filterValue;

    this.dataSource.filterPredicate = (data, filter) => {
      for (const key in this.columnFilters) {
        if (
          this.columnFilters[key] &&
          !data[key]?.toString().toLowerCase().includes(this.columnFilters[key])
        ) {
          return false;
        }
      }
      return true;
    };
    this.dataSource.filter = JSON.stringify(this.columnFilters); // Trigger filtering
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
