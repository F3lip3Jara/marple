import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsMezclaComponent } from './ins-mezcla.component';

describe('InsMezclaComponent', () => {
  let component: InsMezclaComponent;
  let fixture: ComponentFixture<InsMezclaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsMezclaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsMezclaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
