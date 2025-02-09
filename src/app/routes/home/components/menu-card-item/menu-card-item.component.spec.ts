import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCardItemComponent } from './menu-card-item.component';

describe('MenuCardItemComponent', () => {
  let component: MenuCardItemComponent;
  let fixture: ComponentFixture<MenuCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuCardItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
