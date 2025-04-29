import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth/login';
  private baseUrl = 'http://localhost:8000/api/users';
  constructor(private http: HttpClient, private router: Router) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`).pipe(
      catchError(this.handleError) // Handle errors
    );
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      alert('Unauthorized: Please log in again.');
    } else if (error.status === 403) {
      alert('Forbidden: You do not have permission to access this resource.');
    } else {
      alert('An unexpected error occurred.');
    }
    return throwError(() => error);
  }


  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password });
  }

  logout(): void {
    localStorage.removeItem('token'); // Clear the token from localStorage
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
