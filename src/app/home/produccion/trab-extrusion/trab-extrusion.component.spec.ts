import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabExtrusionComponent } from './trab-extrusion.component';

describe('TrabExtrusionComponent', () => {
  let component: TrabExtrusionComponent;
  let fixture: ComponentFixture<TrabExtrusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabExtrusionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabExtrusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
