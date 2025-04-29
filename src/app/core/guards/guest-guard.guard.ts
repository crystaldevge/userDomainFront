import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Adjust the path as needed
import { Router } from '@angular/router';

export const guestGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true; // Allow access if the user is not authenticated
  } else {
    router.navigate(['/dashboard']); // Redirect to dashboard if authenticated
    return false; // Block access
  }
};
