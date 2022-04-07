import { TestBed } from '@angular/core/testing';

import { LogSysService } from './log-sys.service';

describe('LogSysService', () => {
  let service: LogSysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogSysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
