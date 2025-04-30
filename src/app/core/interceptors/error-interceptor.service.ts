import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized
          alert('Unauthorized: Redirecting to login page.');
          localStorage.removeItem('token'); // Clear the token
          this.router.navigate(['/login']); // Redirect to login page
        } else if (error.status === 403) {
          // Handle 403 Forbidden
          alert('Forbidden: You do not have permission to access this resource!');
        } else {
          // Handle other errors
          alert('An unexpected error occurred.');
        }
        return throwError(() => error); // Re-throw the error for further handling if needed
      })
    );
  }
}