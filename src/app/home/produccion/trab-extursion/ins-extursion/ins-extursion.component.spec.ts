import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsExtursionComponent } from './ins-extursion.component';

describe('InsExtursionComponent', () => {
  let component: InsExtursionComponent;
  let fixture: ComponentFixture<InsExtursionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsExtursionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsExtursionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
