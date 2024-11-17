import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { gridResolver } from './grid.resolver';

describe('gridResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => gridResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
