import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsProveedoresComponent } from './ins-proveedores.component';

describe('InsProveedoresComponent', () => {
  let component: InsProveedoresComponent;
  let fixture: ComponentFixture<InsProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsProveedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
