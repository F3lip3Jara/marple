import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabOpcionesComponent } from './trab-opciones.component';

describe('TrabOpcionesComponent', () => {
  let component: TrabOpcionesComponent;
  let fixture: ComponentFixture<TrabOpcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabOpcionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
