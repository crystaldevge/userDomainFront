import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
interface User {
  username: string;
  lastName: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.loadUsers();
  }
  logout(): void {
    this.authService.logout(); // Clear the token
    this.router.navigate(['/login']); // Redirect to the login page
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe({
      next: (data) => {
        this.users = data; // Assign the user list
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }
}
