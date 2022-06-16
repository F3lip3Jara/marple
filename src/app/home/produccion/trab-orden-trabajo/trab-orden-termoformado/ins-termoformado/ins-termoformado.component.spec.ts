import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsTermoformadoComponent } from './ins-termoformado.component';

describe('InsTermoformadoComponent', () => {
  let component: InsTermoformadoComponent;
  let fixture: ComponentFixture<InsTermoformadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsTermoformadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsTermoformadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
