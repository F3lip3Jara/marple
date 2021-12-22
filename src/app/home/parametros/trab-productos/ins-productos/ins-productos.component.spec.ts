import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsProductosComponent } from './ins-productos.component';

describe('InsProductosComponent', () => {
  let component: InsProductosComponent;
  let fixture: ComponentFixture<InsProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
