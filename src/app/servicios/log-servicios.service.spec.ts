import { TestBed } from '@angular/core/testing';

import { LogServiciosService } from './log-servicios.service';

describe('LogServiciosService', () => {
  let service: LogServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
