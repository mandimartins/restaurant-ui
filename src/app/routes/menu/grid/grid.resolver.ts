import { ResolveFn } from '@angular/router';

export const gridResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
