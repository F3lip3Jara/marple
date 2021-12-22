import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabMonedasComponent } from './trab-monedas.component';

describe('TrabMonedasComponent', () => {
  let component: TrabMonedasComponent;
  let fixture: ComponentFixture<TrabMonedasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabMonedasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabMonedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
