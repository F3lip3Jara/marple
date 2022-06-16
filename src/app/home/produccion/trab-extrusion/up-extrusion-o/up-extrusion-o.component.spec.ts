import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpExtrusionOComponent } from './up-extrusion-o.component';

describe('UpExtrusionOComponent', () => {
  let component: UpExtrusionOComponent;
  let fixture: ComponentFixture<UpExtrusionOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpExtrusionOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpExtrusionOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
