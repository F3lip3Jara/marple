import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabRegionComponent } from './trab-region.component';

describe('TrabRegionComponent', () => {
  let component: TrabRegionComponent;
  let fixture: ComponentFixture<TrabRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabRegionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
