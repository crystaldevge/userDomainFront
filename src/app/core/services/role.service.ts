import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
   
  }

  getRoleList(): Observable<any> {
    console.log(`${this.apiUrl}/roles/roles`);
    
    return this.http.get<any[]>(`${this.apiUrl}/roles/roles`, { withCredentials: true });
  }
  createRole(role: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/roles/createRole`, role, { withCredentials: true } );
  }
  updateRole(id: number, role: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/roles/${id}`, role, { withCredentials: true });
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/roles/delete/${id}`, { withCredentials: true });
  }
}
