import { TestBed } from '@angular/core/testing';

import { UpdateService } from './update.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { UpdateViewModel } from './update.viewmodel';
import { HttpVerbsConstant } from '../../../shared/constants/http-verbs.constant';
import { environment } from '../../../../environments/environment';

describe('Category UpdateService', () => {
  let updateService: UpdateService;
  let httpTestingController: HttpTestingController;

  const httpVerbsConstant = HttpVerbsConstant;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    updateService = TestBed.inject(UpdateService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(updateService).toBeTruthy();
  });

  it('should Save a Category', () => {
    updateService.Save(new UpdateViewModel()).subscribe((data) => {
      expect(data).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${environment.RESTAURANT_API}/category/add`,
    );

    expect(req.request.method).toBe(httpVerbsConstant.POST);

    req.flush({ Id: 1, Name: 'Pen', Description: 'All types of pen' });
  });

  it('should Get a Category by Id', () => {
    updateService.Get(1).subscribe((data) => {
      expect(data).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${environment.RESTAURANT_API}/category/get/1`,
    );

    expect(req.request.method).toBe(httpVerbsConstant.GET);

    req.flush({ Id: 1, Name: 'Pen', Description: 'All types of pen' });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
