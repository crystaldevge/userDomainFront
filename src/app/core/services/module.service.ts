import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  private url = `${environment.apiUrl}/module/authorized`;

  constructor(private http: HttpClient) {}
  getModules(): Observable<any> {
    return this.http
      .get(`${this.url}/modules`)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('ModuleService Error:', error);
    return throwError(() => error);
  }
}
