import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabProveedoresComponent } from './trab-proveedores.component';

describe('TrabProveedoresComponent', () => {
  let component: TrabProveedoresComponent;
  let fixture: ComponentFixture<TrabProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabProveedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
