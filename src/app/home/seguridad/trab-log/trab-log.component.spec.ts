import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabLogComponent } from './trab-log.component';

describe('TrabLogComponent', () => {
  let component: TrabLogComponent;
  let fixture: ComponentFixture<TrabLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
