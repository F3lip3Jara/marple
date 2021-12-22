import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabOrdenProduccionComponent } from './trab-orden-produccion.component';

describe('TrabOrdenProduccionComponent', () => {
  let component: TrabOrdenProduccionComponent;
  let fixture: ComponentFixture<TrabOrdenProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabOrdenProduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabOrdenProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
