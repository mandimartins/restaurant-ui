import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { of, throwError } from 'rxjs';
import { Menu, MenuItem } from './home.viewmodel';
import { MatCardModule } from '@angular/material/card';
import { HttpErrorResponse } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockHomeService: jasmine.SpyObj<HomeService>;

  //set up the test environment
  beforeEach(async () => {
    // Create a spy for HomeService
    mockHomeService = jasmine.createSpyObj('HomeService', ['getMenus']);

    // Define a mock menu list to return, matching the new Menu structure
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
      {
        Id: 2,
        Active: true,
        Title: 'Burger',
        Description: 'Juicy beef burger',
        ImageURL: 'burger.jpg',
        ImageBase64: '',
        BadgeDescription: 'Popular',
        BadgeColor: 'green',
        MenuItem: [new MenuItem()],
      },
    ];

    mockHomeService.getMenus.and.returnValue(of(mockMenus)); // Return mock data as observable

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [MatCardModule],
      providers: [{ provide: HomeService, useValue: mockHomeService }],
    }).compileComponents();
  });

  // Create the component and fixture
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should inject HomeService and call getMenus', () => {
    // Act: Call ngOnInit to trigger the HTTP call
    component.ngOnInit();

    expect(mockHomeService.getMenus).toHaveBeenCalled();
  });

  it('should call getMenus and set menus$', () => {
    component.ngOnInit();
    expect(mockHomeService.getMenus).toHaveBeenCalled();
    component.menus$.subscribe((menus) => {
      expect(menus).toEqual([
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
        {
          Id: 2,
          Active: true,
          Title: 'Burger',
          Description: 'Juicy beef burger',
          ImageURL: 'burger.jpg',
          ImageBase64: '',
          BadgeDescription: 'Popular',
          BadgeColor: 'green',
          MenuItem: [new MenuItem()],
        },
      ]);
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
    mockHomeService.getMenus.and.returnValue(throwError(() => errorResponse));

    component.ngOnInit();

    // Check if the error is properly handled by subscribing to the menus$ observable
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
});
