import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  hide: boolean = true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed', err);
          if (err.status === 401) {
            alert('Unauthorized: Please log in again.');
            this.router.navigate(['/login']); // Redirect to login page on 401 error
          } else {
            alert('Invalid username or password'); // Show an error message for other cases
          }
        },
      });
    }
  }
}
