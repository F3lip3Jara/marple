import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabOrdenTermoformadoComponent } from './trab-orden-termoformado.component';

describe('TrabOrdenTermoformadoComponent', () => {
  let component: TrabOrdenTermoformadoComponent;
  let fixture: ComponentFixture<TrabOrdenTermoformadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabOrdenTermoformadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabOrdenTermoformadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
