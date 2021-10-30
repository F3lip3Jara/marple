import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpProveedorComponent } from './up-proveedor.component';

describe('UpProveedorComponent', () => {
  let component: UpProveedorComponent;
  let fixture: ComponentFixture<UpProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
