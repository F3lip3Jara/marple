import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabCalendarioJulComponent } from './trab-calendario-jul.component';

describe('TrabCalendarioJulComponent', () => {
  let component: TrabCalendarioJulComponent;
  let fixture: ComponentFixture<TrabCalendarioJulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabCalendarioJulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabCalendarioJulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
