import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpDesProveeedorComponent } from './up-des-proveeedor.component';

describe('UpDesProveeedorComponent', () => {
  let component: UpDesProveeedorComponent;
  let fixture: ComponentFixture<UpDesProveeedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpDesProveeedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpDesProveeedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
