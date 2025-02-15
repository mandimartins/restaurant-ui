import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { delay, of, throwError } from 'rxjs';
import { Menu, MenuItem } from './home.viewmodel';
import { MatCardModule } from '@angular/material/card';
import { HttpErrorResponse } from '@angular/common/http';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { MenuCardItemComponent } from './components/menu-card-item/menu-card-item.component';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let homeService: jasmine.SpyObj<HomeService>;

  //set up the test environment
  beforeEach(async () => {
    // Create a spy for HomeService
    homeService = jasmine.createSpyObj('HomeService', ['getMenus']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent, MenuCardComponent, MenuCardItemComponent],
      imports: [MatCardModule],
      providers: [
        { provide: HomeService, useValue: homeService },
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { params: of({}) },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA], // Ignore child component errors
    }).compileComponents();
  });

  // Create the component and fixture
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should inject HomeService and call getMenus', () => {
    homeService.getMenus.and.returnValue(of([]));
    fixture.detectChanges();

    expect(homeService.getMenus).toHaveBeenCalled();
  });

  it('should call getMenus and set menus$', () => {
    homeService.getMenus.and.returnValue(of([]));
    fixture.detectChanges();

    expect(homeService.getMenus).toHaveBeenCalled();
    component.menus$.subscribe((menus) => {
      expect(menus).toEqual([]);
    });
  });

  it('should handle error when getMenus fails', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Error fetching menus',
      status: 500,
      statusText: 'Internal Server Error',
      url: 'some-api-url',
    });

    // Simulate the error response from the service
    homeService.getMenus.and.returnValue(throwError(() => errorResponse));

    component.ngOnInit();

    component.menus$.subscribe({
      next: () => {
        fail('Expected error, but got success');
      },
      error: (error) => {
        expect(error).toBe(errorResponse);
        //refactor the central error handling logic to handle the error in a more consistent way
        //check if the error message is logged or handled as expected
      },
    });
  });

  it('should show the spinner while the menus does not load', () => {
    homeService.getMenus.and.returnValue(of().pipe(delay(1000))); // Delay the response
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should show the menu cards when the API return some data', async () => {
    const mockMenus: Menu[] = [
      {
        Id: 1,
        Active: true,
        Title: 'Pizza',
        Description: 'Delicious pizza with cheese',
        ImageURL: 'pizza.jpg',
        ImageBase64: '',
        BadgeDescription: 'New',
        BadgeColor: 'red',
        MenuItem: [new MenuItem()],
      },
    ];

    homeService.getMenus.and.returnValue(of(mockMenus).pipe(delay(1000))); // Delay the response

    fixture.detectChanges();
    await fixture.whenStable(); // Wait for async operations
    fixture.detectChanges();

    const menuCards = fixture.nativeElement.querySelectorAll('app-menu-card');
    expect(menuCards.length).toBe(mockMenus.length);
  });
});
