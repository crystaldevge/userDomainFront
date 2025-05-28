import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  loginForm: FormGroup;
  hide: boolean = true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notify: NotificationService
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
              this.notify.error(response.message.text); // Show error message using notification service
            }
          }
        },
        error: (err) => {
          console.error('Login failed', err);
          if (err.status === 401) {
            this.notify.error('Unauthorized: Please log in again.'); // Show error message for 401 error
            this.router.navigate(['/login']); // Redirect to login page on 401 error
          } else if (err.status === 403) {
            this.notify.error('Permission denied!'); // Show error message for 403 error
            // Show an error message for 403 error
          } else {
            this.notify.error('Invalid username or password'); // Show error message for invalid credentials
          }
        },
      });
    }
  }
}
