import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ErrorMessage } from '../../models/api-errormessage';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  public handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof HttpErrorResponse) 
        errorMessage = `Server-side error: ${error.error.message}`;

    console.error(errorMessage);

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

    return throwError(() => error);
  }
}
