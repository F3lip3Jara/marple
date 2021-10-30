import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProveedorComponent } from './ver-proveedor.component';

describe('VerProveedorComponent', () => {
  let component: VerProveedorComponent;
  let fixture: ComponentFixture<VerProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
