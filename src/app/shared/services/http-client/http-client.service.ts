import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService
  ) { }

  get<T>(url: string, options?: { headers?: HttpHeaders, params?: HttpParams }): Observable<T> {
    return this.http.get<T>(url, options).pipe(
      retry(2), // Retry the request up to 2 times
      catchError(this.errorHandlerService.handleError)
    );
  }

  post<T>(url: string, body: any, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http.post<T>(url, body, options).pipe(catchError(this.errorHandlerService.handleError))
  }

  put<T>(url: string, body: any, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http.put<T>(url, body, options).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  delete<T>(url: string, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http.delete<T>(url, options).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }
}