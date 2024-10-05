import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { updateResolver } from './update.resolver';

describe('updateResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => updateResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
