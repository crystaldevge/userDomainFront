import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    
  }

  logout(): void {
    this.authService.logout(); // Clear the token
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
