import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabColorComponent } from './trab-color.component';

describe('TrabColorComponent', () => {
  let component: TrabColorComponent;
  let fixture: ComponentFixture<TrabColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
