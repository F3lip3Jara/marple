import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpUserComponent } from './up-user.component';

describe('UpUserComponent', () => {
  let component: UpUserComponent;
  let fixture: ComponentFixture<UpUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
