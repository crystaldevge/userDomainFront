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
          if (response.isSuccess) {
             localStorage.setItem('token', response.data.token); // Save token
            this.router.navigate(['/profile']); // Redirect to profile
          } else {
            // Login failed
            if (response.showMessage) {
              alert(response.message.text); // Show error message
            }
          }
        },
        error: (err) => {
          console.error('Login failed', err);
          if (err.status === 401) {
            alert('Unauthorized: Please log in again.');
            this.router.navigate(['/login']); // Redirect to login page on 401 error
          } else if (err.status === 403) {
            alert('Permissiion denied!');
            // Show an error message for 403 error
          } else {
            alert('Invalid username or password'); // Show an error message for other cases
          }
        },
      });
    }
  }
}
