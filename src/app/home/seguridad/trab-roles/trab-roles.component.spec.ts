import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabRolesComponent } from './trab-roles.component';

describe('TrabRolesComponent', () => {
  let component: TrabRolesComponent;
  let fixture: ComponentFixture<TrabRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
