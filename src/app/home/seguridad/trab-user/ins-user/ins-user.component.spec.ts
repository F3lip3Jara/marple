import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsUserComponent } from './ins-user.component';

describe('InsUserComponent', () => {
  let component: InsUserComponent;
  let fixture: ComponentFixture<InsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
