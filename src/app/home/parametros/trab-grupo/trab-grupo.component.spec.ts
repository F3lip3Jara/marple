import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabGrupoComponent } from './trab-grupo.component';

describe('TrabGrupoComponent', () => {
  let component: TrabGrupoComponent;
  let fixture: ComponentFixture<TrabGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
