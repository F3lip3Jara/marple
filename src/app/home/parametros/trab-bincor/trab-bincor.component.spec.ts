import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabBincorComponent } from './trab-bincor.component';

describe('TrabBincorComponent', () => {
  let component: TrabBincorComponent;
  let fixture: ComponentFixture<TrabBincorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabBincorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabBincorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
