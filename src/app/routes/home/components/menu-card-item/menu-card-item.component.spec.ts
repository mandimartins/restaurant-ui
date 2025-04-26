import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuCardItemComponent } from './menu-card-item.component';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HomeService } from '../../home.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('MenuCardItemComponent', () => {
  let component: MenuCardItemComponent;
  let fixture: ComponentFixture<MenuCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule],
      declarations: [MenuCardItemComponent],
      providers: [
        provideRouter([]), // New way (standalone) to provide router for testing
        {
          provide: ActivatedRoute,
          useValue: { params: of({}) }, // Mock ActivatedRoute
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        HomeService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
