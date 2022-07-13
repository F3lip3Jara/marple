import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabSubopcionesComponent } from './trab-subopciones.component';

describe('TrabSubopcionesComponent', () => {
  let component: TrabSubopcionesComponent;
  let fixture: ComponentFixture<TrabSubopcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabSubopcionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabSubopcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
