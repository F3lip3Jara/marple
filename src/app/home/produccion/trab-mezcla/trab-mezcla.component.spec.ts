import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabMezclaComponent } from './trab-mezcla.component';

describe('TrabMezclaComponent', () => {
  let component: TrabMezclaComponent;
  let fixture: ComponentFixture<TrabMezclaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabMezclaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabMezclaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
