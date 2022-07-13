import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabModulosComponent } from './trab-modulos.component';

describe('TrabModulosComponent', () => {
  let component: TrabModulosComponent;
  let fixture: ComponentFixture<TrabModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabModulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
