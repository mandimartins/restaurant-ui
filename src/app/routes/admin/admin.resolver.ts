import { Inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ErrorHandlerService } from '../../shared/services/error-handler/error-handler.service';

export const adminResolver: ResolveFn<boolean> = (route, state) => {

  const authService = Inject(AuthService)
  const errorService = Inject(ErrorHandlerService)
  const router = Inject(Router)

  return authService
    .verifyAccess()
    .then((data: any) => data)
    .catch((error: any) => {
      console.error(error)
      router.navigate(['/'])
    });
};
