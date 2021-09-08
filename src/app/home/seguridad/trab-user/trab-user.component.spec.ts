import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabUserComponent } from './trab-user.component';

describe('TrabUserComponent', () => {
  let component: TrabUserComponent;
  let fixture: ComponentFixture<TrabUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
