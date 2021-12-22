import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabSubGrupoComponent } from './trab-sub-grupo.component';

describe('TrabSubGrupoComponent', () => {
  let component: TrabSubGrupoComponent;
  let fixture: ComponentFixture<TrabSubGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabSubGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabSubGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
