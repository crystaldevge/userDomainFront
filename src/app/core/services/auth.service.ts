import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
interface Permission {
  id: number; // Replace with actual properties
  name: string; // Replace with actual properties
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth/login';
  private baseUrl = 'http://localhost:8000/api/users';
  constructor(private http: HttpClient, private router: Router) {}

  getPermissions(): Observable<any> {
    return this.http.get(
      'http://127.0.0.1:8000/api/users/authorized/permissions'
    );
  }

  getModules(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/users/authorized/modules');
  }
  getUserProfile(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/users/profile');
  }
  getUsers(skip: number, fetch: number): Observable<any> {
    const url = `${this.baseUrl}/users?skip=${skip}&fetch=${fetch}`;
    return this.http.get(url).pipe(
      catchError(this.handleError) // Handle errors
    );
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log('Error occurred:', error); // Log the error for debugging
    
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
