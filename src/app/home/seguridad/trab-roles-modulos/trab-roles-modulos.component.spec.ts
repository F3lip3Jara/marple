import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabRolesModulosComponent } from './trab-roles-modulos.component';

describe('TrabRolesModulosComponent', () => {
  let component: TrabRolesModulosComponent;
  let fixture: ComponentFixture<TrabRolesModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabRolesModulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabRolesModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
