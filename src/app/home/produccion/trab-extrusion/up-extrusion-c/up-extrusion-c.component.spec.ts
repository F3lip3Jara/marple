import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpExtrusionCComponent } from './up-extrusion-c.component';

describe('UpExtrusionCComponent', () => {
  let component: UpExtrusionCComponent;
  let fixture: ComponentFixture<UpExtrusionCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpExtrusionCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpExtrusionCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
