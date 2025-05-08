import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private http: HttpClient) {}
  private url = environment.apiUrl;
  getPermissionsByRoleId(roleId: number): Observable<any> {
    return this.http.get<any>(
      `${this.url}/${roleId}/permissions`
    );
  }
}
