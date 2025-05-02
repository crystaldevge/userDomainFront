import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = 'http://localhost:8000/api/roles';

  constructor(private http: HttpClient) {}

  getRoleList(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/roles`);
  }
  createRole(role: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createRole`, role);
  }
  updateRole(id: number, role: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, role);
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
