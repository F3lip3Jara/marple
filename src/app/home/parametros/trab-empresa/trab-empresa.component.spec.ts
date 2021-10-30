import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabEmpresaComponent } from './trab-empresa.component';

describe('TrabEmpresaComponent', () => {
  let component: TrabEmpresaComponent;
  let fixture: ComponentFixture<TrabEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
