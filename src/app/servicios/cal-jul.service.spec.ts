import { TestBed } from '@angular/core/testing';

import { CalJulService } from './cal-jul.service';

describe('CalJulService', () => {
  let service: CalJulService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalJulService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
