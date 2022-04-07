import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelProductoComponent } from './sel-producto.component';

describe('SelProductoComponent', () => {
  let component: SelProductoComponent;
  let fixture: ComponentFixture<SelProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
