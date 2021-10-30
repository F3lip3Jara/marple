import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabCiudadComponent } from './trab-ciudad.component';

describe('TrabCiudadComponent', () => {
  let component: TrabCiudadComponent;
  let fixture: ComponentFixture<TrabCiudadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabCiudadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabCiudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
