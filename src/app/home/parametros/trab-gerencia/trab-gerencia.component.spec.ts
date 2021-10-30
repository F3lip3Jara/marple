import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabGerenciaComponent } from './trab-gerencia.component';

describe('TrabGerenciaComponent', () => {
  let component: TrabGerenciaComponent;
  let fixture: ComponentFixture<TrabGerenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabGerenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabGerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
