import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelExtrusionComponent } from './sel-extrusion.component';

describe('SelExtrusionComponent', () => {
  let component: SelExtrusionComponent;
  let fixture: ComponentFixture<SelExtrusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelExtrusionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelExtrusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
