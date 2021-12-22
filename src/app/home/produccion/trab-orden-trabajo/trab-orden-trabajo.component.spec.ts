import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabOrdenTrabajoComponent } from './trab-orden-trabajo.component';

describe('TrabOrdenTrabajoComponent', () => {
  let component: TrabOrdenTrabajoComponent;
  let fixture: ComponentFixture<TrabOrdenTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabOrdenTrabajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabOrdenTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
