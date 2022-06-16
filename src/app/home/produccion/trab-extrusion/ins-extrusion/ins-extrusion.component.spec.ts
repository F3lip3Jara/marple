import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsExtrusionComponent } from './ins-extrusion.component';

describe('InsExtrusionComponent', () => {
  let component: InsExtrusionComponent;
  let fixture: ComponentFixture<InsExtrusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsExtrusionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsExtrusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
