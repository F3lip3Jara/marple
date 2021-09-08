import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabEtapasComponent } from './trab-etapas.component';

describe('TrabEtapasComponent', () => {
  let component: TrabEtapasComponent;
  let fixture: ComponentFixture<TrabEtapasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabEtapasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabEtapasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
