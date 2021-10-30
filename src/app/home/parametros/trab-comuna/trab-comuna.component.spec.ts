import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabComunaComponent } from './trab-comuna.component';

describe('TrabComunaComponent', () => {
  let component: TrabComunaComponent;
  let fixture: ComponentFixture<TrabComunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabComunaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabComunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
