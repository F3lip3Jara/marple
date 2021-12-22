import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabProductosComponent } from './trab-productos.component';

describe('TrabProductosComponent', () => {
  let component: TrabProductosComponent;
  let fixture: ComponentFixture<TrabProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
