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

  get(url: string, options?: { headers?: HttpHeaders, params?: HttpParams }): Observable<any> {
    return this.http.get(url, options).pipe(
      retry(2), // Retry the request up to 2 times
      catchError(this.errorHandlerService.handleError)
    );
  }

  post(url: string, body: any, options?: { headers?: HttpHeaders }): Observable<unknown> {
    return this.http.post(url, body, options).pipe(catchError(this.errorHandlerService.handleError))
  }

  put(url: string, body: any, options?: { headers?: HttpHeaders }): Observable<unknown> {
    return this.http.put(url, body, options).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  delete(url: string, options?: { headers?: HttpHeaders }): Observable<unknown> {
    return this.http.delete(url, options).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }
}