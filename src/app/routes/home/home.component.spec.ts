import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { of } from 'rxjs';
import { Menu, MenuItem } from './home.viewmodel';
import { MatCardModule } from '@angular/material/card';

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

  it('should create', () => {
    expect(component).toBeTruthy();
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
});
