import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabExtursionComponent } from './trab-extursion.component';

describe('TrabExtursionComponent', () => {
  let component: TrabExtursionComponent;
  let fixture: ComponentFixture<TrabExtursionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabExtursionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabExtursionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
