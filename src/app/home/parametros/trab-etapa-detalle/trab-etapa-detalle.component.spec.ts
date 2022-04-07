import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabEtapaDetalleComponent } from './trab-etapa-detalle.component';

describe('TrabEtapaDetalleComponent', () => {
  let component: TrabEtapaDetalleComponent;
  let fixture: ComponentFixture<TrabEtapaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabEtapaDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabEtapaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
