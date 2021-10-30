import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabPaisComponent } from './trab-pais.component';

describe('TrabPaisComponent', () => {
  let component: TrabPaisComponent;
  let fixture: ComponentFixture<TrabPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabPaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
