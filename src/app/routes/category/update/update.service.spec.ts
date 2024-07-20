import { TestBed } from '@angular/core/testing';

import { UpdateService } from './update.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UpdateViewModel } from './update.viewmodel';

describe('UpdateService', () => {

  let updateService: UpdateService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    updateService = TestBed.inject(UpdateService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(updateService).toBeTruthy();
  });

  it('should Save a Category', () => {

    updateService.Save(new UpdateViewModel()).subscribe(data => {
      expect(data).toBeTruthy()
    })

    const req = httpTestingController.expectOne('https://localhost:7051/api/category/add');
    
    expect(req.request.method).toBe("POST")

    req.flush({Id: 1, Name:"Pen", Description: "All types of pen"})
  })

  it("should Get a Category by Id", () => {

    updateService.Get(1).subscribe(data => {
      expect(data).toBeTruthy()
    })
    
    const req = httpTestingController.expectOne('https://localhost:7051/api/category/get/1')

    expect(req.request.method).toBe("GET")

    req.flush({Id: 1, Name:"Pen", Description: "All types of pen"})
  })

  afterEach(() => {
    httpTestingController.verify();
  })
});
