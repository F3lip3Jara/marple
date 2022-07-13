import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabMovRechazoComponent } from './trab-mov-rechazo.component';

describe('TrabMovRechazoComponent', () => {
  let component: TrabMovRechazoComponent;
  let fixture: ComponentFixture<TrabMovRechazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabMovRechazoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabMovRechazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
