import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) {
    console.log('url', this.url);
  }

  getPermissions(): Observable<any> {
    return this.http.get(`${this.url}/users/authorized/permissions`);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}/auth/login`, {
      username,
      password,
    });
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
