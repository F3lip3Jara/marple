import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLateralModuleComponent } from './menu-lateral-module.component';

describe('MenuLateralModuleComponent', () => {
  let component: MenuLateralModuleComponent;
  let fixture: ComponentFixture<MenuLateralModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuLateralModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLateralModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
