import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLateralSubmoduleComponent } from './menu-lateral-submodule.component';

describe('MenuLateralSubmoduleComponent', () => {
  let component: MenuLateralSubmoduleComponent;
  let fixture: ComponentFixture<MenuLateralSubmoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuLateralSubmoduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLateralSubmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
