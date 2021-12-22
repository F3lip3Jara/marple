import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabUnidadMedidaComponent } from './trab-unidad-medida.component';

describe('TrabUnidadMedidaComponent', () => {
  let component: TrabUnidadMedidaComponent;
  let fixture: ComponentFixture<TrabUnidadMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabUnidadMedidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabUnidadMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
