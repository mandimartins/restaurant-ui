import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UpdateService } from './update.service';
import { Observable, of } from 'rxjs';
import { UpdateViewModel } from './update.viewmodel';

export const updateResolver: ResolveFn<Observable<UpdateViewModel>> = (
  route,
  state,
) => {
  const updateService = inject(UpdateService);

  const id = route.params['id'];

  if (id > 0) return updateService.Get(id);

  return of(new UpdateViewModel());
};
