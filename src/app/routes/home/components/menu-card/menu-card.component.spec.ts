import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCardComponent } from './menu-card.component';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

describe('MenuCardComponent', () => {
  let component: MenuCardComponent;
  let fixture: ComponentFixture<MenuCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [MenuCardComponent],
      providers: [
        provideRouter([]), // New way to provide router for testing
        {
          provide: ActivatedRoute,
          useValue: { params: of({}) }, // Mock ActivatedRoute
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
