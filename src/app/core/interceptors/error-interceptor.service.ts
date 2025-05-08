import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private router: Router, private notify: NotificationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized
          this.notify.error('Unauthorized: Redirecting to login page.');
          localStorage.removeItem('token'); // Clear the token
          this.router.navigate(['/login']); // Redirect to login page
        } else if (error.status === 403) {
          // Handle 403 Forbidden
          this.notify.warning(
            'Forbidden: You do not have permission to access this resource!'
          );
        } else {
          // Handle other errors
          // this.notify.error('An unexpected error occurred.');
          console.log('Error occurred:', error); // Log the error for debugging
          
        }
        return throwError(() => error); // Re-throw the error for further handling if needed
      })
    );
  }
}
