import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../core/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  updateModules(modules: any[]) {
    throw new Error('Method not implemented.');
  }
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getModulesByRoleId(roleId: number): Observable<any> {
    return this.http.get<any>(
      `${this.url}/module/${roleId}`
    );
     
  }

  getModules(): Observable<any> {
    return this.http
      .get(`${this.url}/modules`)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('ModuleService Error:', error);
    return throwError(() => error);
  }

  setUserRoleModules(data: { roleId: number; activeModuleIds: number[] }): Observable<any> {
    return this.http.post(`${this.url}/module/setUserModuleByRoleId`, data);
  }

}
