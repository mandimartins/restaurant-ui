import { TestBed } from '@angular/core/testing';

import { ErrorHandlerService } from './error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessage } from '../../models/api-errormessage';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle 401 error and return custom error', (done) => {
    const errorMessage = 'Error message'
    const mockErrorResponse = new HttpErrorResponse({
      error: errorMessage,
      status: 401,
      statusText: 'Unauthorized'
    });

    service.handleError(mockErrorResponse).subscribe({
      next: () => fail('Expected an error, not data'),
      error: (error) => {
        expect(error).toBeInstanceOf(HttpErrorResponse);
        expect(error.status).toBe(401);
        expect(error.error).toEqual([new ErrorMessage('Unauthorized access', 'Access denied. Your session expired, try to sign in again.')]);
        done();
      }
    });
  });

  it('should handle other errors and return the original error', (done) => {
    const errorMessage = 'Server error';
    const mockErrorResponse = new HttpErrorResponse({
      error: { message: errorMessage },
      status: 500,
      statusText: 'Server Error'
    });
  
    service.handleError(mockErrorResponse).subscribe({
      next: () => fail('Expected an error, not data'),
      error: (error) => {
        expect(error).toBeInstanceOf(HttpErrorResponse);
        expect(error.status).toBe(500);
        expect(error.error).toEqual({ message: errorMessage });
        done();
      }
    });
  });

});
