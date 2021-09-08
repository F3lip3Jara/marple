import { TestBed } from '@angular/core/testing';

import { InterceptorsErrorService } from './interceptors-error.service';

describe('InterceptorsErrorService', () => {
  let service: InterceptorsErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorsErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
