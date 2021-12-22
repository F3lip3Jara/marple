import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsOrdenProduccionComponent } from './ins-orden-produccion.component';

describe('InsOrdenProduccionComponent', () => {
  let component: InsOrdenProduccionComponent;
  let fixture: ComponentFixture<InsOrdenProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsOrdenProduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsOrdenProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
