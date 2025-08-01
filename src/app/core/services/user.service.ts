import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.apiUrl}/users`;
  
  
  constructor(
    private http: HttpClient,
    private notify: NotificationService
  ) {}

  getUserProfile(): Observable<any> {
    return this.http
      .get(`${this.url}/profile`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }
  getUsers(skip: number, fetch: number): Observable<any> {
    const url = `${this.url}/users/?skip=${skip}&fetch=${fetch}`;
    return this.http.get(url, { withCredentials: true }).pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log('Error occurred:', error); // Log the error for debugging

    if (error.status === 401) {
      this.notify.error('Unauthorized: Please log in again.');
    } else if (error.status === 403) {
      this.notify.warning(
        'Forbidden: You do not have permission to access this resource.'
      );
    } else {
      this.notify.error('An unexpected error occurred.');
    }
    return throwError(() => error);
  }
}
