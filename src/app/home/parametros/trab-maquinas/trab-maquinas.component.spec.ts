import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabMaquinasComponent } from './trab-maquinas.component';

describe('TrabMaquinasComponent', () => {
  let component: TrabMaquinasComponent;
  let fixture: ComponentFixture<TrabMaquinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabMaquinasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabMaquinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
