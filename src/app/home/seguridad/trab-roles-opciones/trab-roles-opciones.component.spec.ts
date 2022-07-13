import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabRolesOpcionesComponent } from './trab-roles-opciones.component';

describe('TrabRolesOpcionesComponent', () => {
  let component: TrabRolesOpcionesComponent;
  let fixture: ComponentFixture<TrabRolesOpcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabRolesOpcionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabRolesOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
