import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    // Log the error (you can also log to a remote server here)
    console.error(errorMessage);

    //It could be redirection as well, but  the message helps for now 
    if(error.status === 401){
  
     const customError = new HttpErrorResponse({
      error: [ new ErrorMessage('Unauthorized access','Access denied. Your session expired, try to sign in again.')],
      headers: error.headers,
      status: error.status,
      statusText: error.statusText,
      url: error.url ? error.url : ''
     });

      return throwError(() => customError)
    }
    // Throw an observable with a user-facing error message
    return throwError(() => error);
  }

  get(url: string, options?: { headers?: HttpHeaders, params?: HttpParams }): Observable<any> {
    return this.http.get(url, options).pipe(
      retry(2), // Retry the request up to 2 times
      catchError(this.handleError)
    );
  }

  post(url: string, body: any, options?: { headers?: HttpHeaders }): Observable<unknown> {
    return this.http.post(url, body, options).pipe(catchError(this.handleError))
  }

  put(url: string, body: any, options?: { headers?: HttpHeaders }): Observable<unknown> {
    return this.http.put(url, body, options).pipe(
      catchError(this.handleError)
    );
  }

  delete(url: string, options?: { headers?: HttpHeaders }): Observable<unknown> {
    return this.http.delete(url, options).pipe(
      catchError(this.handleError)
    );
  }
}

class ErrorMessage{
  public readonly title: string;
  public readonly content:string;

  constructor(private _title:string, private _content: any) {
    this.title = _title;
    this.content = _content;
  }
}