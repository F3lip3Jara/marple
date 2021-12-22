import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsOrdTrabajoComponent } from './ins-ord-trabajo.component';

describe('InsOrdTrabajoComponent', () => {
  let component: InsOrdTrabajoComponent;
  let fixture: ComponentFixture<InsOrdTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsOrdTrabajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsOrdTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
