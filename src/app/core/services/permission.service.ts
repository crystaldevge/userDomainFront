import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private http: HttpClient) {}
  private url = environment.apiUrl;
  getPermissionsByRoleId(roleId: number): Observable<any> {
    console.log(`${this.url}/${roleId}/permissions`);
    
    return this.http.get<any>(
      `${this.url}/${roleId}/permissions`
    );
  }

  setUserPermissions(data: any): Observable<any> {
    return this.http.post(`${this.url}/permission/setUserPermission`, data);
  }
  


}
